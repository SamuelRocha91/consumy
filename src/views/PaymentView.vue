<script setup lang="ts">
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const payment = ref({
  payment: "",
  cardNumber: "",
  cardName: "",
  cardExpiration: "",
  cardCVV: ""
});
const router = useRouter();

const paymentSent = ref(false);

const validateFields = () => {
  if (!payment.value.payment) {
    Swal.fire("Selecione um método de pagamento");
    return false;
  } else if (!payment.value.cardNumber) {
    Swal.fire("Preencha o número do cartão");
    return false;
  } else if (!payment.value.cardName) {
    Swal.fire("Preencha o nome do titular do cartão");
    return false;

  } else if (!payment.value.cardExpiration) {
    Swal.fire("Preencha a data de expiração");
    return false;

  } else if (!payment.value.cardCVV) {
    Swal.fire("Preencha o CVV");
    return false;

  } else {
    return true;
  }
};

const handleSubmit = (event: Event) => {
  event.preventDefault();
  if (!validateFields()) {
    return;
  };
  paymentSent.value = true;
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  payment.value = {
    ...payment.value,
    [target.name]: target.value
  };
};
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
            :value="payment.cardNumber"
            type="text"
            class="form-control"
            id="cardNumber"
            name="cardNumber"
            >
          </div>
          <div class="form-group">
            <label for="cardName">Nome Completo</label>
            <input
            @input="handleInput"
            placeholder="Zeca Tatu Lombriga"
            type="text" class="form-control"
            id="cardName"
            :value="payment.cardName"
            name="cardName">
          </div>
          <div class="form-group">
            <label for="cardExpiration">Expiração</label>
            <input
            @input="handleInput"
            placeholder="01-07-2050"
            type="text"
            class="form-control"
            :value="payment.cardExpiration"
            id="cardExpiration"
            name="cardExpiration"
            >
          </div>
          <div class="form-group">
            <label for="cardCVV">CVV</label>
            <input
            @input="handleInput"
            placeholder="123"
            type="text"
            class="form-control"
            :value="payment.cardCVV"
            id="cardCVV"
            name="cardCVV"
            >
          </div>
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
        </div>
        <div>
          <button class="btn btn-primary" @click.prevent="router.push('/dashboard/pedidos')">Acompanhar meus pedidos</button>
        </div>
    </template>
</template>