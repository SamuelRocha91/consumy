 <script setup lang="ts">
 import { onMounted, ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import CartList from '@/components/CartList.vue';
import CartEmpty from '@/components/CartEmpty.vue';

const quantity = ref(0);

const cart = ref([]);
onMounted(() => {
    const products = localStorage.getItem('cart') || '';
    const productsParsed = products ? JSON.parse(products) : '';
    if (productsParsed) {
        cart.value = productsParsed;
        quantity.value = productsParsed.length;
    }
})

const removeCart = (id: number) => {
    const list = cart.value.filter((product: any) => product.id !== id);
    cart.value = list;
    localStorage.setItem('cart', JSON.stringify(list))
    quantity.value = list.length
}

</script>
 
<template>
 <NavBar :quantity="quantity" />
 <CartList v-if="cart.length > 0" :products="cart" :removeCart="removeCart"/>
 <CartEmpty v-else />
</template>