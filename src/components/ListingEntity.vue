<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const { entity, pagination } = defineProps <{
    entity: any,
    pagination: any,
    handlePage: (data?: any) => void,
    search: () => void,
    addProductsInCart: (id: number) => void,
    idsInCart?: any,
    removeProductsInCart: (id: number) => void
}>()

const URL = import.meta.env.VITE_BASE_URL;
const searchQuery = defineModel('searchQuery', { default: '' });
const selectedCategory = defineModel('selectedCategory', { default: '' });
const currentPage = ref(1);
const router = useRouter();
const route = useRoute();
const searchProducts = (id: number) => {
  router.push(`/dashboard/stores/${id}`)
}
console.log(entity)

</script>
<template>
  <div class="container">
    <div class="filters-menu row">
      <div class="col-md-6 mb-3">
        <input
          id="search-item"
          class="form-control bg-input-2"
          placeholder="Busque pelo nome da loja"
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

        >
          <option value="" disabled selected>Filtrar por categoria</option>
          <option value="categoria">Categoria</option>
        </select>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-4 mb-4" v-for="(data, index) in entity" :key="index">
        <div class="card card-store">
          <img :src="URL + data.src" class="card-img-top" alt="Store Image">
          <div class="card-body">
            <h5 class="card-title">{{ data.name }}</h5>
            <p class="card-text">{{ data.description }}</p>
            <p class="card-text"><strong>Categoria:</strong> {{ data.category }}</p>
            <p v-if="route.path !== '/dashboard/stores'" class="card-text"><strong>Preço:</strong> {{ data.price }}</p>
            <p class="card-text"><strong>Distância:</strong> 2 km</p>
            <a v-if="route.path == '/dashboard/stores'" @click="searchProducts(data.id)" class="btn btn-primary">Ver Produtos</a>
             <a v-if="!data.inCart" @click.prevent="addProductsInCart(data.id)" class="btn btn-primary">Adicionar ao carrinho</a>
              <a v-if="data.inCart" @click.prevent="removeProductsInCart(data.id)" class="btn btn-danger">Remover produto</a>
          </div>
        </div>
      </div>
    </div>

    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="handlePage( pagination.previous)">Anterior</a>
        </li>
        <li class="page-item" v-for="page in pagination.pages" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="handlePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === pagination.pages }">
          <a class="page-link" href="#" @click.prevent="handlePage(pagination.next)">Próxima</a>
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
</style>
