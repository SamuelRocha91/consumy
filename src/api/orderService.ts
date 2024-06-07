import { BaseService } from "./abstractService";

class OrderService extends BaseService{
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
}

export const orderService = new OrderService();