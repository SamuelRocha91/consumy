<script setup lang="ts">
defineProps<{
  orders?: any,
}>();
</script>
<template>
  <div class="container">
    <div class="row ">
      <div class="col-md-12 head-home">
        <h1>Comida boa e gostozinha</h1>
        <h2>A vovó faz tudo o que você precisa!</h2>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-12">
        <h2>Últimos pedidos</h2>
        <div class="card-deck" v-if="orders">
          <div class="card" v-for="order in orders" :key="order.id">
            <div class="card-body">
              <h5 class="card-title">Pedido 1</h5>
              <p class="card-text">Descrição do pedido 1.</p>
            </div>
          </div>
        </div>
       <div v-else>
        <p>Não há pedidos recentes.</p>
       </div>
     </div> 
    </div>

    <div class="row mt-5">
      <div class="col-md-12">
        <h2>Lojas recentes</h2>
        <div class="card-deck" v-if="orders" >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Loja 1</h5>
              <p class="card-text">Descrição da loja 1.</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Não há lojas recentes.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head-home {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.head-home h1 {
  font-weight: bold;
}
</style>