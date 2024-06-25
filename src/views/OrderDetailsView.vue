<script setup lang="ts">
import OrderDetails from '@/components/OrderDetails.vue';
import { onMounted, ref } from 'vue';
import type { Order } from '../types/orderTypes';
import { orderService } from '@/api/orderService';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const cancelOrder = (id: number) => {
  orderService.cancelOrder(1, id, () => {
    Swal.fire('Pedido cancelado com sucesso!');
    router.push('/dashboard/orders');
  });
};

const sendToOrderPage = () => {
  router.push('/dashboard/orders');
};
const order = ref<Order[]>([]);
const router = useRouter();
const $route = useRoute();
const id = Number($route.params.id);

onMounted(() => {
  orderService.getOrderById(id, (data: any) => {
    order.value = data;
  });
});
</script>
<template>
    <OrderDetails
     :order="order" 
     :cancelOrder="cancelOrder"
     :sendToOrderPage="sendToOrderPage"
     />
</template>