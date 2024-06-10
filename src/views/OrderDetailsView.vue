<script setup lang="ts">
import OrderDetails from '@/components/OrderDetails.vue';
import { onMounted, ref } from 'vue';
import type { Order } from '../types/orderTypes';

const orders = ref<Order[]>([]);

onMounted(() => {
    
})
</script>
<template>
    <OrderDetails />
</template>