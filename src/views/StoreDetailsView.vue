<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import ListingStores from '@/components/ListingEntity.vue';
import { onMounted, ref } from 'vue';
import debounce from 'lodash/debounce';
import { ProductService } from '@/api/productService';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';

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
const cartIds = ref<any>([])

const changePage = (page: any) => {
  if (page > 0 && page <= pagination.value.pages) {
    getlist(page)
  }
};
const quantity = ref(0);
const addProductsInCart = (id: number, selectQuantity: string) => {
  if (!selectQuantity) {
    Swal.fire("Por favor, preencha a quantidade antes de adicionar ao carrinho");
    return
  }
  const data = localStorage.getItem('cart') || '';
  const dataParsed = data ? JSON.parse(data) : [];
  const product = products.value.find((product: any) => product.id === id)
  const index = products.value.findIndex((product: any) => product.id === id)

  const newObjectCart = {
    ...product,
    storeId: storeId.value,
    quantity: selectQuantity,
   }
  dataParsed.push(newObjectCart)
  localStorage.setItem('cart', JSON.stringify(dataParsed))
  cartIds.value.push(id)
  products.value[index].inCart = true
  quantity.value = dataParsed.length
}

const removeProductsInCart = (id: number) => {
  const data = localStorage.getItem('cart') || '';
  const dataParsed = data ? JSON.parse(data) : [];
  const filterProduct = dataParsed.filter((product: any) => product.id !== id)
  localStorage.setItem('cart', JSON.stringify(filterProduct))
  const indexProduct = products.value.findIndex((product: any) => product.id === id)
  products.value[indexProduct].inCart = false

  const index = cartIds.value.findIndex((element: number) => element === id);
  cartIds.value.splice(index, 1)
  quantity.value = cartIds.value.length
}

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
        products.value = data.result.products.map((product: any) => ({
          ...product,
          src: product.image_url,
          name: product.title,
          inCart: cartIds.value.some((id: number) => id == product.id),
          quantity: 1
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
  const cart = localStorage.getItem('cart') || ''
  const parseCart = cart ? JSON.parse(cart) : []
  parseCart.forEach((product: any) => {
    cartIds.value.push(product.id)
  })
  quantity.value = cartIds.value.length
  getlist(1);
})
</script>
<template>
  <NavBar :quantity="quantity"/>
  <ListingStores
   v-if="products" 
   :entity="products" 
   :pagination="pagination" 
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