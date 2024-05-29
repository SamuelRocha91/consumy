<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import ListingStores from '@/components/ListingEntity.vue';
import { onMounted, ref } from 'vue';
import { StoreService } from '@/api/storeService';
import debounce from 'lodash/debounce';

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

const searchQuery = defineModel('searchQuery', { default: '' })
const selectedCategory = defineModel('selectedCategory', {default: ''})

const filteredStores = () => {
  getlist(1, searchQuery.value, selectedCategory.value)
};

const debouncedSearch = debounce(filteredStores, 300);

const getlist = (page: number, search = '', category = '') => {
   storeService.getStores(
        page,
      (data: any) => {
      console.log(data)
        stores.value = data.result.stores.map((store: any) => ({
          ...store,
          src: store.avatar_url,
      }));
      pagination.value.next = data.pagination.next || 1;
      pagination.value.previous = data.pagination.previous || 1;
      pagination.value.previous = data.pagination.pages;
      pagination.value.current = data.pagination.current;

        } ,
        () => {
            console.log('falhoooooouuuu')
     },
     search,
     category
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
   :addProductsInCart="() => console.log('nada')"
   :pagination="pagination" 
   :handlePage="changePage" 
   :search="debouncedSearch"
   v-model:searchQuery="searchQuery"
   v-model:selectedCategory="selectedCategory"
      :removeProductsInCart="() => console.log('nada')"

   />
</template>

<style scoped>
</style>