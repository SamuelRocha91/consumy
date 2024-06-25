<script setup lang="ts">
import OrderCard from '@/components/OrderCard.vue';
import { onMounted, ref } from 'vue';
import { orderService } from '@/api/orderService';
import type { Order } from '../types/orderTypes';
import PaginationPage from '@/components/PaginationPage.vue';

import { useRouter } from 'vue-router';

const router = useRouter();
const seeDetails = (id: number) => {
  router.push(`/dashboard/orders/${id}`);
};
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
  orderService.getOrders((data) => {
    console.log('Orders fetched:', data);
    ordersFinished.value = data.result.orders.map((order: any) => ({
      id: order.id,
      hour: order.created_at.split('T')[1].split('.')[0],
      date: order.created_at.split('T')[0],
      status: order.state,
    }));
    totalPages.value = data.result.pagination.pages;
    currentPage.value = data.result.pagination.current;
    loadingFinished.value = false;
  }, () => {
    console.log('Error fetching orders');
    loadingFinished.value = false;
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
          <OrderCard 
           v-for="order in ordersInProgress"
           :key="order.id" 
           :order="order" 
           :seeDetails="seeDetails" 
           class="col-lg-4 col-md-6 mb-4"
          />
          <div class="not-orders" v-if="ordersInProgress.length == 0">
            <h1>
              Você não possui pedidos ativos no momento.
            </h1>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h2>Histórico de Pedidos</h2>
        <div v-if="loadingFinished" class="loading">Carregando...</div>
        <div v-else  class="flex-cont">
          <OrderCard 
            v-for="order in ordersFinished" 
            :key="order.id"
            :order="order" 
            :seeDetails="seeDetails"
           />
        </div>
        <PaginationPage
         :currentPage="currentPage" 
         :totalPages="totalPages" 
         :changePage="fetchOrders" 
        />
      </div>
    </div>
  </div>
</template>

<style>
.flex-cont {
  display: flex;
  flex-wrap: wrap;
}

.not-orders {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 1px 1px 5px #ccc;
}

.not-orders h1 {
  font-size: 20px;
}
</style>