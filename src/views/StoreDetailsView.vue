<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import ListingStores from '@/components/ListingEntity.vue';
import { onMounted, ref } from 'vue';
import debounce from 'lodash/debounce';
import { ProductService } from '@/api/productService';
import { useRoute } from 'vue-router';


const productsService = new ProductService();
const products = ref<any>([])
const pagination = ref({
  current: 1,
  next: 0,
  previous: 0,
  pages: 0
})
const route = useRoute();
const storeId = ref(route.params.id);

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
   productsService.getProducts(
      Number(storeId.value),
      (data: any) => {
      console.log(data)
        products.value = data.result.products.map((product: any) => ({
          ...product,
          src: product.image_url,
          name: product.title
      }));
      pagination.value.next = data.pagination.next || 1;
      pagination.value.previous = data.pagination.previous || 1;
      pagination.value.previous = data.pagination.pages;
      pagination.value.current = data.pagination.current;

        } ,
        () => {
            console.log('falhoooooouuuu')
     },
     page,
     search,
     category,
    ) 
}

onMounted(() => {
  getlist(1);
})
</script>
<template>
  <NavBar />
  <ListingStores
   v-if="products" 
   :entity="products" 
   :pagination="pagination" 
   :handlePage="changePage" 
   :search="debouncedSearch"
   v-model:searchQuery="searchQuery"
   v-model:selectedCategory="selectedCategory"
   />
</template>

<style scoped>
</style>