<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import ListingStores from '@/components/ListingEntity.vue';
import { onMounted, ref } from 'vue';
import { StoreService } from '@/api/storeService';

const storeService = new StoreService();
const stores = ref<any>([])
const pagination = ref({
  current: 1,
  next: 0,
  previous: 0,
  pages: 0
})
const changePage = (page: any) => {
  if (page > 0 && page <= pagination.value.pages) {
    getlist(page)
  }
};

const getlist = (page: number) => {
   storeService.getStores(
        page,
      (data: any) => {
      console.log(data)
        stores.value = data.stores.map((store: any) => ({
          ...store,
          src: store.avatar_url,
      }));
      pagination.value.next = data.pagination.next;
      pagination.value.previous = data.pagination.previous;
      pagination.value.previous = data.pagination.pages;
      pagination.value.current = data.pagination.current;

        } ,
        () => {
            console.log('falhoooooouuuu')
      },
    ) 
}

onMounted(() => {
  getlist(1);
})
</script>
<template>
  <NavBar />
  <ListingStores
   v-if="stores" 
   :entity="stores" 
   :pagination="pagination" 
   :handlePage="changePage" />
</template>

<style scoped>
</style>