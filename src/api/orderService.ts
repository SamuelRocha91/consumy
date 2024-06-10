import { BaseService } from "./abstractService";
import { fetchEventSource } from '@microsoft/fetch-event-source';

class OrderService extends BaseService{
  async connectToOrderStream(success: (data: any) => void, noConnection: () => void) {
    const token = this.getFallback('token');
    fetchEventSource(`${this.apiUrl}/buyers/orders/stream`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-API-KEY': BaseService.X_API_KEY
      },
      async onopen(response) {
        if (response.ok) {
          console.log('Conexão estabelecida');
        } else {
          console.log('Erro ao estabelecer conexão');
        }
      },
      onmessage(msg) {
        if (msg.event === 'new orders') {
          success(JSON.parse(msg.data));
        } else {
          console.log('Evento desconhecido');
          noConnection();
        }
      },
      onerror(err) {
        console.log(err);
      }
    });
  }
  
  async createOrder(order: any, payment: any, onSuccess: () => void, onFailure: () => void) {
    const orderItems = {
      order: {
        ...order,
      }
    };
    const response = await this.post('buyers/orders', orderItems);
    if (response.ok) {
      this.payment(response, payment, onSuccess, onFailure);
    } else if (response.status === 401) {
      await this.refreshToken();
      const newResponse = await this.post('buyers/orders', order);
      if (newResponse.ok) {
        this.payment(newResponse, payment, onSuccess, onFailure);
      } else {
        this.auth.signOut();
      }
    } else {
      this.failure(response, onFailure);
    }
  }
    
  async payment(response: Response, payment: any, onSuccess: () => void, onFailure: () => void) {
    const order = await response.json();
    const newPayment = 
      {
        payment: {
          ...payment,
        }
      };
    const paymentResponse = await this.put(`buyers/orders/${order.order.id}/pay`, newPayment);
    if (paymentResponse.ok) {
      this.success(paymentResponse,onSuccess);
    } else if (paymentResponse.status === 401) {
      await this.refreshToken();
      const newPaymentResponse = await this.put(`buyers/orders/${order.id}/pay`, payment);
      if (newPaymentResponse.ok) {
        this.success(newPaymentResponse, onSuccess);
      } else {
        this.auth.signOut();
      }
    } else {
      this.failure(paymentResponse, onFailure);
    }
  }   

  async getOrders(onSuccess: (data: any) => void, onFailure: () => void, page = 1) {
    const response = await this.getAll(`buyers/orders?page=${page}`);
    if (response.ok) {
      const data = await response.json();
      onSuccess(data);
    } else if (response.status === 401) {
      await this.refreshToken();
      const newResponse = await this.getAll(`buyers/orders?page=${page}`);
      if (newResponse.ok) {
        const data = await newResponse.json();
        onSuccess(data);
      } else {
        this.auth.signOut();
      }
    } else {
      this.failure(response, onFailure);
    }
  }

  async getOrderById(orderId: number, success: (data: any) => void) {
    const response = await this.getEntity(`buyers/orders/${orderId}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
  }
}

export const orderService = new OrderService();