<script setup lang="ts">
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
    quantity.value = dataParsed
      .reduce((acc: any, curr: any) => acc + curr.quantity, 0);;
  }
});
</script>
 

<template>
 <HomePage />
</template>