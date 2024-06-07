<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { catergoriesProducts , categories} from '@/utils/data';

const { entity } = defineProps<{
  entity: any,
  current: any,
  next: any,
  previous: any,
  pages: any,
  handlePage: (data?: any) => void,
  search: () => void,
  addProductsInCart: (id: number, quantity: string) => void,
  idsInCart?: any,
  removeProductsInCart: (id: number) => void
}>();

const URL = import.meta.env.VITE_BASE_URL;
const searchQuery = defineModel('searchQuery', { default: '' });
const selectedCategory = defineModel('selectedCategory', { default: '' });
const router = useRouter();
const route = useRoute();

const returnToStores = () => {
  router.push('/dashboard/stores');
};

const searchProducts = (id: number) => {
  router.push(`/dashboard/stores/${id}`);
};
</script>
<template>
  <div class="container">
    <div class="filters-menu row">
      <div class="col-md-6 mb-3">
        <input
          id="search-item"
          class="form-control bg-input-2"
          placeholder="Busque pelo nome"
          type="search"
          v-model="searchQuery"
          @input="search"
        >
      </div>
      <div class="col-md-6 mb-3">
        <select
          id="category-filter"
          class="form-control select-box-2"
          v-model="selectedCategory"
          @change="search"
          v-if="route.path !== '/dashboard/stores'" 
        >
          <option value="" disabled selected>Filtrar por categoria</option>
          <option v-for="(category, index) in catergoriesProducts "
           :value="category" :key="index">{{ category }}</option>
        </select>
         <select
          id="category-filter"
          class="form-control select-box-2"
          v-model="selectedCategory"
          @change="search"
          v-if="route.path == '/dashboard/stores'" 
        >
          <option value="" disabled selected>Filtrar por categoria</option>
          <option v-for="(category, index) in categories"
           :value="category" :key="index">{{ category }}</option>
        </select>
      </div>
      <div v-if="route.path !== '/dashboard/stores'" class="d-flex justify-content-center w-100">
        <button class="btn btn-primary" @click.prevent="returnToStores">Voltar para lojas</button>
      </div>
    </div>
  </div>
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4 d-flex align-items-stretch" v-for="(data, index) in entity" :key="index">
            <div class="card card-store flex-grow-1">
              <img :src="URL + data.src" class="card-img-top" alt="Store Image">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ data.name }}</h5>
                <p class="card-text">{{ data.description }}</p>
                <p class="card-text">
                  <strong>Categoria:</strong> {{ data.category }}
                </p>
                <p v-if="route.path !== '/dashboard/stores'" class="card-text">
                  <strong>Preço:</strong> {{ data.price }}
                </p>
                <p v-if="route.path !== '/dashboard/stores'" class="card-text quantity-select-container">
                  <strong>Quantidade:</strong> 
                  <select v-model="data.quantity" class="form-select form-select-sm quantity-select" id="quantitySelect">
                    <option v-for="n in 9" :value="n" :key="n">{{ n }}</option>
                  </select>
                </p>
                <p v-if="route.path == '/dashboard/stores'" class="card-text">
                  <strong>Distância:</strong>2 km
                </p>
                <div class="mt-auto">
                  <a v-if="route.path == '/dashboard/stores'" @click="searchProducts(data.id)" class="btn btn-primary">
                    Ver Produtos
                  </a>
                  <a v-if="route.path !== '/dashboard/stores' && !data.inCart" @click.prevent="addProductsInCart(data.id, data.quantity)" class="btn btn-primary">
                    Adicionar ao carrinho
                  </a>
                  <a v-if="route.path !== '/dashboard/stores' && data.inCart" @click.prevent="removeProductsInCart(data.id)" class="btn btn-danger">
                    Remover produto
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav>
            <ul class="pagination justify-content-end">
              <li class="page-item" :class="{ disabled: current === 1 }">
                <a class="page-link" href="#" @click.prevent="handlePage(previous)">
                  Anterior
                </a>
              </li>
              <li class="page-item" v-for="page in pages" :key="page" :class="{ active: current === page }">
                <a class="page-link" href="#" @click.prevent="handlePage(page)">
                  {{ page }}
                </a>
              </li>
              <li class="page-item" :class="{ disabled: current === pages }">
                <a class="page-link" href="#" @click.prevent="handlePage(next)">
                  Próxima
                </a>
              </li>
            </ul>
           </nav>
  </div>
</template>


<style setup>
.filters-menu {
  margin: 20px 0;
}

.bg-input-2 {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  padding: 10px;
  border-radius: .25rem;
}

.select-box-2 {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  padding: 10px;
  border-radius: .25rem;
  width: 100%;
 }
 
.card-store {
    margin: 20px;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

 .quantity-select-container {
    display: flex;
    align-items: center;
    gap: 10px; 
  }
  .quantity-select {
    width: auto; 
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
