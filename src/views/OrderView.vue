<script setup lang="ts">
import OrderCard from '@/components/OrderCard.vue';
import { onMounted, ref } from 'vue';
import { orderService } from '@/api/orderService';
import type { Order } from '../types/orderTypes';
import PaginationPage from '@/components/PaginationPage.vue';

const loadingInProgress = ref(false);
const loadingFinished = ref(false);
const ordersInProgress = ref<Order[]>([]);
const ordersFinished = ref<Order[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const fetchOrders = async (page: number) => {
  loadingFinished.value = true;
  currentPage.value = page;

  loadingFinished.value = false;
}; 

onMounted(() => {
  loadingInProgress.value = true;
  loadingFinished.value = true;
  orderService.connectToOrderStream((order: any) => {
    console.log('New order received:', order);
    ordersInProgress.value = order.orders.map((order: any) => ({
      id: order.id,
      hour: order.created_at.split('T')[1].split('.')[0],
      date: order.created_at.split('T')[0],
      status: order.state,
    }));;
    loadingInProgress.value = false;
  }, () => {
    console.log('Reconnecting to the order stream...');
    loadingInProgress.value = false;
  });
});

</script>
<template>
  <div class="container">
    <h1 class="my-4">Meus Pedidos</h1>

    <div class="row">
      <div class="col-12">
        <h2>Pedidos Ativos</h2>
        <div v-if="loadingInProgress" class="loading">Carregando...</div>
        <div v-else class="flex-cont">
          <OrderCard v-for="order in ordersInProgress" :key="order.id" :order="order" class="col-lg-4 col-md-6 mb-4"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h2>Histórico de Pedidos</h2>
        <div v-if="loadingFinished" class="loading">Carregando...</div>
        <div v-else>
          <OrderCard v-for="order in ordersFinished" :key="order.id" :order="order" />
        </div>
        <PaginationPage :currentPage="currentPage" :totalPages="totalPages" @page-changed="fetchOrders" />
      </div>
    </div>
  </div>
</template>

<style>
.flex-cont {
  display: flex;
  flex-wrap: wrap;
}
</style>