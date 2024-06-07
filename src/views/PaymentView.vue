<script setup lang="ts">
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { createStorage } from '@/utils/storage';
import { orderService } from '@/api/orderService';
import { useSharedRefs } from '@/utils/useSharedRefs';

const paymentData = ref({
  payment: "",
  cardNumber: "",
  cardName: "",
  cardExpiration: "",
  cardCVV: ""
});
const paymentSent = ref(false);
const quantity = useSharedRefs().quantity;
const router = useRouter();
const storage = createStorage(true);
const total = ref("");

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  switch (target.name) {
  case "cardNumber":
    target.value = target.value
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2");
    break;
  case "cardExpiration":
    target.value = target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
    break;
  }
  paymentData.value = {
    ...paymentData.value,
    [target.name]: target.value
  };
};

const handlePage = () => {
  router.push("/orders");
};

const handleSubmit = (event: Event) => {
  event.preventDefault();
  if (!validateFields()) {
    return;
  };

  const [day, month, year] = paymentData.value.cardExpiration.split('/');
  const americanDate = `${year}-${month}-${day}`;
  const price = total.value.replace('R$', '').replace(',', '.');
  const payment = {
    value: price,
    number: paymentData.value.cardNumber,
    valid: americanDate,
    cvv: paymentData.value.cardCVV,
  };
  const data = storage.get('cart') || '[]';
  const dataParsed = JSON.parse(data);
  const order = {
    store_id: dataParsed[0].store_id,
    order_items_attributes: dataParsed.map((product: any) => {
      return {
        product_id: product.id,
        amount: product.quantity,
        price: product.price.replace('R$', '')
      };
    })
  };
  paymentSent.value = true;
  orderService.createOrder(order, payment, () => {
    storage.remove('cart');
    quantity.value = 0;
    console.log('Pedido efetuado com sucesso');
  }, () => {
    Swal.fire("Erro ao efetuar pagamento");
  });
};

const validateFields = () => {
  if (!paymentData.value.payment) {
    Swal.fire("Selecione um método de pagamento");
    return false;
  } else if (!paymentData.value.cardNumber || paymentData.value.cardNumber.length < 19) {
    Swal.fire("Preencha o número do cartão");
    return false;
  } else if (!paymentData.value.cardName) {
    Swal.fire("Preencha o nome do titular do cartão");
    return false;

  } else if (!paymentData.value.cardExpiration || paymentData.value.cardExpiration.length < 10) {
    Swal.fire("Preencha a data de expiração");
    return false;

  } else if (!paymentData.value.cardCVV) {
    Swal.fire("Preencha o CVV");
    return false;

  } else {
    return true;
  }
};

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const parsePrice = (priceString: string) => {
  return parseFloat(priceString.replace('R$', '').replace(',', '.'));
};

const sumPrices = (priceStrings: string[]) => {
  return priceStrings.reduce((total, priceString) => {
    return total + parsePrice(priceString);
  }, 0);
};

onMounted(() => {
  const arrayPrices: string[] = [];
  const data = storage.get('cart') || '[]';
  const dataParsed = JSON.parse(data);
  if (dataParsed) {
   
    dataParsed.forEach((product: any) => {
      for (let i = 0; i < product.quantity; i += 1) {
        arrayPrices.push(product.price);
      }
    });
    const sum = sumPrices(arrayPrices);
    total.value = formatPrice(sum);
  }
});
</script>
 
<template>
    <template v-if="!paymentSent">
     <div class="container mt-5 gap-3">
       <h1 class="text-center">Pagamento</h1>
       <form @submit="handleSubmit">
        <div class="mb-4 d-flex justify-content-center align-content-center flex-column mt-5">
          <h3>Método de pagamento</h3>
            <div class="form-check">
              <input @change="handleInput" class="form-check-input" type="radio" id="credit" name="payment" value="credit">
              <label class="form-check-label" for="credit">Crédito</label>
            </div>
            <div class="form-check">
              <input @change="handleInput" class="form-check-input" type="radio" id="debit" name="payment" value="debit">
              <label class="form-check-label" for="debit">Débito</label>
            </div>
        </div>
        <div class="mb-4">
          <h3>Detalhes de pagamento</h3>
          <div class="form-group">
            <label for="cardNumber">Número do cartão</label>
            <input
            @input="handleInput"
            placeholder="xxxx xxxx xxxx xxxx"
            :value="paymentData.cardNumber"
            type="text"
            class="form-control"
            id="cardNumber"
            name="cardNumber"
            maxlength="19"
            >
          </div>
          <div class="form-group">
            <label for="cardName">Nome Completo</label>
            <input
            @input="handleInput"
            placeholder="Zeca Tatu Lombriga"
            type="text" class="form-control"
            id="cardName"
            :value="paymentData.cardName"
            name="cardName">
          </div>
          <div class="form-group">
            <label for="cardExpiration">Expiração</label>
            <input
            @input="handleInput"
            placeholder="01-07-2050"
            type="text"
            class="form-control"
            :value="paymentData.cardExpiration"
            id="cardExpiration"
            name="cardExpiration"
            maxlength="10"
            >
          </div>
          <div class="form-group">
            <label for="cardCVV">CVV</label>
            <input
            @input="handleInput"
            placeholder="123"
            type="text"
            class="form-control"
            :value="paymentData.cardCVV"
            id="cardCVV"
            name="cardCVV"
            maxlength="3"
            >
          </div>
          <p class="price-display">Total: {{ total }}</p>
        </div>
        <div  class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary">Pagar</button>
        </div>
       </form>
      </div>
    </template>
    <template v-else>
        <div class="container mt-5 gap-3">
            <h1 class="text-center">Pagamento</h1>
            <div class="alert alert-success" role="alert">
            Solicitação de pagamento efetuado com sucesso!
            </div>
            <div>
               <button class="btn btn-primary" @click.prevent="handlePage">Acompanhar meus pedidos</button>
            </div>
        </div>
    </template>
</template>