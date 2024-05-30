<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import HomePage from '@/components/HomePage.vue';
import { onMounted } from 'vue';
import { createStorage } from '@/utils/storage';
import { useSharedRefs } from '@/utils/useSharedRefs';

const quantity = useSharedRefs().quantity;
const storage = createStorage(true);

onMounted(() => {
  const data = storage.get('cart') || '[]';
  const dataParsed = JSON.parse(data);
  if (dataParsed) {
    quantity.value = dataParsed.length;
  }
});
</script>
 

<template>
 <NavBar :quantity="quantity"/>
 <HomePage />
</template>