 <script setup lang="ts">
import { useRouter } from 'vue-router';
import { Auth } from '../utils/auth';
import { ref } from 'vue';

defineProps < {
  quantity: number;
}>()

const auth = new Auth();
const isLoggedIn = ref(auth.isLoggedIn());
const route = useRouter();
const currentUser = ref(auth.currentUser());
const signOut = function () {
  auth.signOut(() => (isLoggedIn.value = auth.isLoggedIn()))
  route.push('/')
}
</script>
<template>
    <nav class="navbar navbar-dark bg-info px-3 p-2 d-flex align-items-center">
        <h3 class="navbar-brand p-2">Olá, {{ currentUser && currentUser.email }}</h3>
          <li class="nav-item  p-2 d-flex">
            <a class="nav-link text-white" href="/dashboard">Home</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link text-white" href="">Pedidos</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link text-white" href="/dashboard/stores">Quero comer</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link text-white" href="/dashboard/profile">Perfil</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link" href="/dashboard/cart">
               <i class="fas fa-shopping-cart"></i>
            </a>
            <div class="number-products">{{ quantity }}</div>
           </li>
        <nav>
          <a class="btn btn-outline-info text-white my-2 my-sm-0 p-2" @click.prevent="signOut">Sign Out</a>
        </nav>
    </nav>
</template>

<style scoped>
 .nav-item {
      color: white;
      margin: 0 1rem;
      text-decoration: none;
    }

    .nav-link {
      color: white !important;
    }

.number-products {
  display: flex;
  color: red;
}
</style>

