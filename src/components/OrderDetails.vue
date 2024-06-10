<script setup lang="ts">
defineProps<{
  order: any,
  cancelOrder: (id: number) => void,
  sendToOrderPage: () => void,
}>();

const isCancelable = (status: string) => {
  if (status === 'payment_failed' || status == 'delivered' || status == 'canceled') {
    return false;
  } else {
    return true;
  }
};
</script>
<template>
  <div class="card">
    <div class="card-header">
      <h1>Pedido {{ order.id }}</h1>
    </div>
    <div class="card-body">
      <p class="status-content">Status: {{ order.status }}</p>
      <div v-for="(data, index) in order.items" :key="index" class="order-item">
        <div class="product-info">
          <p>Produto: {{ data.product }}</p>
          <p>Quantidade: {{ data.amount }}</p>
          <p>Preço: {{ data.price }}</p>
        </div>
        <hr class="divider">
      </div>
    </div>
    <div class="total-section">
      <p class="total" >Total: R${{ order.total }}</p>
    </div>
    <div class="card-footer d-flex justify-content-end">
      <button @click="sendToOrderPage" class="btn btn-primary">Retornar para página de pedidos</button>
      <button v-if="isCancelable(order.status)" @click="cancelOrder(order.id)" class="btn btn-danger">Recusar</button>
    </div>

  </div>
</template>

<style scoped>
.order-item {
  margin-bottom: 20px;
}

.product-info {
  margin-bottom: 10px;
}

.divider {
  border-top: 1px solid #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
}

.total-section {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.total {
  color: green;
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
}

.status-content {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
