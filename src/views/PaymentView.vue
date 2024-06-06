<script setup lang="ts">
</script>
 

<template>
 <div class="container mt-5 gap-3">
   <h1 class="text-center">Pagamento</h1>
   <form>
    <div class="mb-4 d-flex justify-content-center align-content-center flex-column mt-5">
      <h3 >Método de pagamento</h3>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="credit" name="payment" value="credit">
          <label class="form-check-label" for="credit">Crédito</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="debit" name="payment" value="debit">
          <label class="form-check-label" for="debit">Débito</label>
        </div>
    </div>
    <div class="mb-4">
      <h3 >Detalhes de pagamento</h3>
      <div class="form-group">
        <label for="cardNumber">Número do cartão</label>
        <input placeholder="xxxx xxxx xxxx xxxx" type="text" class="form-control" id="cardNumber" name="cardNumber">
      </div>
      <div class="form-group">
        <label for="cardName">Nome Completo</label>
        <input placeholder="Zeca Tatu Lombriga" type="text" class="form-control" id="cardName" name="cardName">
      </div>
      <div class="form-group">
        <label for="cardExpiration">Expiração</label>
        <input placeholder="01-07-2050" type="text" class="form-control" id="cardExpiration" name="cardExpiration">
      </div>
      <div class="form-group">
        <label for="cardCVV">CVV</label>
        <input placeholder="123" type="text" class="form-control" id="cardCVV" name="cardCVV">
      </div>
    </div>
    <div  class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary">Pagar</button>
    </div>
   </form>
  </div>
</template>