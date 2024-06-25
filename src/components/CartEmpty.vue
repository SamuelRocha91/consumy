<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="empty-cart-message">
    <i class="bi bi-cart-x"></i>
    <h1>Você ainda não possui itens adicionados ao carrinho</h1>
    <p>
      Explore nossos produtos e adicione seus itens favoritos ao carrinho.
    </p>
    <RouterLink 
      to="/dashboard/stores" 
      class="btn btn-primary"
    >
      Ver Lojas
    </RouterLink>
  </div>
</template>

<style scoped>
.empty-cart-message {
  text-align: center;
  margin-top: 50px;
  color: #555;
}

.empty-cart-message i {
  font-size: 3rem;
  color: #007bff;
  margin-bottom: 20px;
}

.empty-cart-message h1 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.empty-cart-message p {
  font-size: 1rem;
  margin-bottom: 20px;
}

.empty-cart-message .btn {
  font-size: 1rem;
}
</style>