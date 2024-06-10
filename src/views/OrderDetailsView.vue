<script setup lang="ts">
import OrderDetails from '@/components/OrderDetails.vue';
import { onMounted, ref } from 'vue';
import type { Order } from '../types/orderTypes';
import { orderService } from '@/api/orderService';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const order = ref<Order[]>([]);
const router = useRouter();
const cancelOrder = (id: number) => {
  orderService.cancelOrder(1, id, () => {
    Swal.fire('Pedido cancelado com sucesso!');
    router.push('/dashboard/orders');
  });
};

onMounted(() => {
  orderService.getOrderById(1, (data: any) => {
    order.value = data;
  });
});
</script>
<template>
    <OrderDetails :order="order" :cancelOrder="cancelOrder"/>
</template>