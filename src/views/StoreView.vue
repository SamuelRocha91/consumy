<script setup lang="ts">
import ListingStores from '@/components/ListingEntity.vue';
import { onMounted, ref } from 'vue';
import { StoreService } from '@/api/storeService';
import debounce from 'lodash/debounce';
import { useSharedRefs } from '@/utils/useSharedRefs';
import { createStorage } from '@/utils/storage';
import Swal from 'sweetalert2';
import type { dataStoreRequest, storeRequest } from '@/types/storeTypes';
import { Auth } from '@/utils/auth';

const auth = new Auth();
const current = ref(0);
const next = ref(0);
const previous = ref(0);
const pages = ref(0);
const quantity = useSharedRefs().quantity;
const searchQuery = defineModel('searchQuery', { default: '' });
const selectedCategory = defineModel('selectedCategory', { default: '' });
const storeService = new StoreService();
const stores = ref<storeRequest[]>([]);
const storage = createStorage(true);

const changePage = (page: number) => {
  if (page > 0 && page <= pages.value) {
    getlist(page);
  }
};

const fetchStores = (page: number, search = '', category = '', withToken = true) => {
  storeService.getStores(
    page,
    (data: dataStoreRequest) => {
      console.log('Request succeeded with JSON response', data);
      stores.value = data.result.stores.map((store: any) => ({
        ...store,
        src: store.avatar_url,
      }));
      next.value = data.result.pagination.next || 1;
      previous.value = data.result.pagination.previous || 1;
      pages.value = data.result.pagination.pages;
      current.value = data.result.pagination.current || 1;
    },
    (erro: any) => {
      console.error('Request failed:', erro);
      Swal.fire('Falha ao tentar carregar as lojas. Tente novamente');
    },
    search,
    category,
    withToken
  );
};

const filteredStores = () => {
  getlist(1, searchQuery.value.toLocaleLowerCase(), selectedCategory.value);
};

const debouncedSearch = debounce(filteredStores, 300);

const getlist = (page: number, search = '', category = '') => {
  if (auth.currentUser()) {
    fetchStores(page, search, category);
  } else {
    fetchStores(page, search, category, false);
  }
};

onMounted(() => {
  const data = storage.get('cart') || '[]';
  const dataParsed = JSON.parse(data);
  if (dataParsed) {
    quantity.value = dataParsed
      .reduce((acc: any, curr: any) => acc + curr.quantity, 0);
  }
  getlist(1);
});
</script>
<template>
  <ListingStores
   v-if="stores" 
   :entity="stores"
   :addProductsInCart="() => console.log('nada')"
   :current="current"
   :next="next"
   :previous="previous"
   :pages="pages"
   :handlePage="changePage" 
   :search="debouncedSearch"
   v-model:searchQuery="searchQuery"
   v-model:selectedCategory="selectedCategory"
   :removeProductsInCart="() => console.log('nada')"
   />
</template>

<style scoped>
</style>