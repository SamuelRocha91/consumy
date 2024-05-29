<script setup lang="ts">
defineProps < {
  products: any;
  removeCart: (id: number) => void
}>()
</script>
<template>
    <div class="col" v-for="(product, index) in products" :key="index">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
             <div class="d-flex justify-content-between align-items-center mb-3">
                <p class="font-weight-bold mb-0">Quantidade:</p>
                <p class=" mb-0">{{ product.quantity }}</p>
             </div>
             <div class="d-flex justify-content-between align-items-center mb-3">
                <p class="font-weight-bold mb-0">Preço</p>
                <p class="text-success mb-0">{{ product.price }}</p>
             </div>
            <button @click.prevent="removeCart(product.id)" class="btn btn-danger">Remover do carrinho</button>
          </div>
        </div>
      </div>
    </div>
</template>