<script setup lang="ts">
import { onMounted, ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import CartList from '@/components/CartList.vue';
import CartEmpty from '@/components/CartEmpty.vue';
import { useSharedRefs } from '@/utils/useSharedRefs';
import { createStorage } from '@/utils/storage';

const cart = ref([]);
const quantity = useSharedRefs().quantity;
const storage = createStorage(true);
const total = ref("");

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const parsePrice = (priceString: string) => {
  return parseFloat(priceString.replace('R$', '').replace(',', '.'));
};

const sumPrices = (priceStrings: string[]) => {
  return priceStrings.reduce((total, priceString) => {
    return total + parsePrice(priceString);
  }, 0);
};

onMounted(() => {
  const arrayPrices: string[] = [];
  const data = storage.get('cart') || '[]';
  const dataParsed = JSON.parse(data);
  if (dataParsed) {
    cart.value = dataParsed;
    quantity.value = dataParsed
      .reduce((acc: any, curr: any) => acc + curr.quantity, 0);
    dataParsed.forEach((product: any) => {
      for (let i = 0; i < product.quantity; i += 1) {
        arrayPrices.push(product.price);
      }
    });
    const sum = sumPrices(arrayPrices);
    total.value = formatPrice(sum);
  }
});

const removeCart = (id: number) => {
  const arrayPrices: string[] = [];
  const list = cart.value.filter((product: any) => product.id !== id);
  cart.value = list;
  storage.store('cart', JSON.stringify(list));
  quantity.value = list.length;
  cart.value.forEach((product: any) => {
    for (let i = 0; i < product.quantity; i += 1) {
      arrayPrices.push(product.price);
    }
  });
  const sum = sumPrices(arrayPrices);
  total.value = formatPrice(sum);
};
</script>
 
<template>
 <NavBar :quantity="quantity" />
 <CartList v-if="cart.length > 0" :products="cart" :removeCart="removeCart"/>
   <div v-if="cart.length > 0" class="price-container">
    <p class="price-display">Total: {{ total }}</p>
    <button class="btn btn-primary">Fechar pedido</button>
  </div>
 <CartEmpty v-else />
</template>

<style scoped>
.price-container {
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  text-align: center;
}

.price-display {
  font-size: 1.25rem;
  font-weight: bold;
  color: #28a745;
}
</style>