<script setup lang="ts">
import type { Order } from '../types/orderTypes';

defineProps<{
  order: Order,
}>();
</script>
<template>
  <div class="col-lg-4 col-md-6 order-card">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Pedido #{{ order.id }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Data: {{ order.date }}</h6>
        <p class="card-text">Status: {{ order.status }}</p>
        <p class="card-text">Hora: {{ order.hour }}</p>
        <a href="#" class="card-link">Ver Detalhes</a>
      </div>
    </div>
  </div>
</template>
