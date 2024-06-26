<script setup lang="ts">
import ListingStores from '@/components/ListingEntity.vue';
import { onMounted, ref } from 'vue';
import debounce from 'lodash/debounce';
import { ProductService } from '@/api/productService';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import { useSharedRefs } from '@/utils/useSharedRefs';
import { createStorage } from '@/utils/storage';
import {
  type dataProductsRequest,
  type productType
} from '@/types/productTypes';
import { Auth } from '@/utils/auth';

const auth = new Auth();
const cartIds = ref<number[]>([]);
const current = ref(0);
const next = ref(0);
const previous = ref(0);
const pages = ref(0);
const productsService = new ProductService();
const products = ref<productType[]>([]);
const quantity = useSharedRefs().quantity;
const route = useRoute();
const searchQuery = defineModel('searchQuery', { default: '' });
const selectedCategory = defineModel('selectedCategory', { default: '' });
const storeId = ref(route.params.id);
const storage = createStorage(true);

const addProductsInCart = (id: number, selectQuantity: string) => {
  if (!selectQuantity) {
    Swal.fire(
      "Por favor, preencha a quantidade antes de adicionar ao carrinho"
    );
    return;
  }
  const data = storage.get('cart') || '[]';
  let dataParsed = JSON.parse(data);
  const product = products.value.find((product: any) => product.id === id);
  const index = products.value.findIndex((product: any) => product.id === id);
  if (dataParsed.some((prodct: any) => prodct.storeId != product?.storeId)) {
    Swal.fire({
      title: "Você já possui rango de outra loja no carrinho",
      text: "Deseja esvaziar o carrinho e adicionar o novo item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "É sim, correto e certo!"
    }).then((result) => {
      if (result.isConfirmed) {
        dataParsed = product;
        storage.store('cart', JSON.stringify([dataParsed]));
        cartIds.value = [id];
        products.value[index].inCart = true;
        quantity.value = Number(selectQuantity);
        return;
      } else {
        return;
      }
    });
    return;
  }
  const newObjectCart = {
    ...product,
    storeId: storeId.value,
    quantity: selectQuantity,
  };
  dataParsed.push(newObjectCart);
  storage.store('cart', JSON.stringify(dataParsed));
  cartIds.value.push(id);
  products.value[index].inCart = true;
  quantity.value += Number(selectQuantity);
};

const changePage = (page: number) => {
  if (page > 0 && page <= pages.value) {
    getlist(page);
  }
};

const fetchProducts = (page: number, search = '', category = '', withToken = true) => {
  const cart = localStorage.getItem('cart') || '[]';
  const parseCart = JSON.parse(cart);
  productsService.getProducts(
    Number(storeId.value),
    (data: dataProductsRequest) => {
      products.value = data.result.products.map((product: any) => ({
        ...product,
        src: product.image_url,
        name: product.title,
        inCart: cartIds.value.some((id: number) => id == product.id),
        quantity: parseCart.some((field: any) => field.id == product.id) ?
          parseCart.find((field: any) => field.id == product.id).quantity
          : 1,
        storeId: product.store_id
      }));
      next.value = data.result.pagination.next || 1;
      pages.value = data.result.pagination.pages;
      current.value = data.result.pagination.current || 1;
      previous.value = data.result.pagination.previous || 1;
    },
    (error: any) => {
      console.error('Request failed:', error);
      Swal.fire('Falha ao tentar carregar os produtos. Tente novamente');
    },
    page,
    search,
    category,
    withToken
  );
};

const removeProductsInCart = (id: number) => {
  const data = storage.get('cart') || '[]';
  const dataParsed = JSON.parse(data);
  const filterProduct = dataParsed.filter((product: any) => product.id !== id);
  storage.store('cart', JSON.stringify(filterProduct));
  const indexProduct = products.value
    .findIndex((product: any) => product.id === id);
  products.value[indexProduct].inCart = false;

  const index = cartIds.value.findIndex((element: number) => element === id);
  quantity.value -= products.value[indexProduct].quantity || 0;
  cartIds.value.splice(index, 1);
};

const filteredStores = () => {
  getlist(1, searchQuery.value.toLocaleLowerCase(), selectedCategory.value);
};

const debouncedSearch = debounce(filteredStores, 300);

const getlist = (page: number, search = '', category = '') => {
  if (auth.currentUser()) {
    fetchProducts(page, search, category);
  } else {
    fetchProducts(page, search, category, false);
  }
};

onMounted(() => {
  const cart = localStorage.getItem('cart') || '';
  const parseCart = cart ? JSON.parse(cart) : [];
  parseCart.forEach((product: any) => {
    cartIds.value.push(product.id);
  });
  quantity.value = parseCart
    .reduce((acc: any, curr: any) => acc + curr.quantity, 0);;
  getlist(1);
});
</script>
<template>
  <ListingStores
   v-if="products" 
   :entity="products" 
   :current="current"
   :next="next"
   :previous="previous"
   :pages="pages" 
   :handlePage="changePage" 
   :search="debouncedSearch"
   v-model:searchQuery="searchQuery"
   v-model:selectedCategory="selectedCategory"
   :addProductsInCart="addProductsInCart"
   :idsInCart="cartIds"
   :removeProductsInCart="removeProductsInCart"
   />
</template>

<style scoped>
</style>