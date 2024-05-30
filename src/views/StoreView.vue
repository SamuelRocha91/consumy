<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import ListingStores from '@/components/ListingEntity.vue';
import { onMounted, ref } from 'vue';
import { StoreService } from '@/api/storeService';
import debounce from 'lodash/debounce';
import { useSharedRefs } from '@/utils/useSharedRefs';

const pagination = ref({
  current: 1,
  next: 0,
  previous: 0,
  pages: 0
})
const quantity = useSharedRefs().quantity;
const searchQuery = defineModel('searchQuery', { default: '' })
const selectedCategory = defineModel('selectedCategory', { default: '' });
const storeService = new StoreService();
const stores = ref<any>([]);

const changePage = (page: any) => {
  if (page > 0 && page <= pagination.value.pages) {
    getlist(page)
  }
};

const filteredStores = () => {
  getlist(1, searchQuery.value, selectedCategory.value)
};

const getlist = (page: number, search = '', category = '') => {
   storeService.getStores(
        page,
      (data: any) => {
      console.log(data)
        stores.value = data.result.stores.map((store: any) => ({
          ...store,
          src: store.avatar_url,
      }));
      pagination.value.next = data.pagination.next ? data.pagination.next : 1;
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

const debouncedSearch = debounce(filteredStores, 300);

onMounted(() => {
   const products = localStorage.getItem('cart') || '';
    const productsParsed = products ? JSON.parse(products) : '';
    if (productsParsed) {
        quantity.value = productsParsed.length;
    }
  getlist(1);
})
</script>
<template>
  <NavBar :quantity="quantity"/>
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