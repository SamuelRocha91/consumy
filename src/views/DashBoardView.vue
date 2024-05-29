 <script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import HomePage from '@/components/HomePage.vue';
import { onMounted, ref } from 'vue';

const quantity = ref(0);
onMounted(() => {
    const products = localStorage.getItem('cart') || '';
    const productsParsed = products ? JSON.parse(products) : '';
    if (productsParsed) {
        quantity.value = productsParsed.length;
    }
})
</script>
 

<template>
 <NavBar :quantity="quantity"/>
 <HomePage />
</template>