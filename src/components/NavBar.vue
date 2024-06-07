<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import { Auth } from '../utils/auth';
import { ref } from 'vue';

defineProps<{
  quantity: number;
}>();

const auth = new Auth();
const route = useRouter();
const currentUser = ref(auth.currentUser());
const signOut = function () {
  auth.signOut();
  route.push('/');
  currentUser.value = null;
};
</script>
<template>
    <nav class="navbar navbar-dark bg-info px-3 p-2 d-flex align-items-center">
        <h3 class="navbar-brand p-2" v-if="currentUser">
          Olá, {{ currentUser && currentUser.email }}
        </h3>
          <li  v-if="currentUser" class="nav-item  p-2 d-flex">
            <RouterLink 
            class="nav-link text-white"
            to="/dashboard"
            >
            Home
          </RouterLink>
          </li>
          <li  v-if="!currentUser" class="nav-item  p-2 d-flex">
            <RouterLink 
            class="nav-link text-white"
            to="/"
            >
            Home
          </RouterLink>
          </li>
          <li v-if="currentUser" class="nav-item p-2 d-flex">
            <RouterLink class="nav-link text-white" to="/dashboard/orders">Pedidos</RouterLink>
          </li>
          <li class="nav-item p-2 d-flex">
            <RouterLink class="nav-link text-white" to="/dashboard/stores">
              Quero comer
            </RouterLink>
          </li>
          <li v-if="currentUser" class="nav-item p-2 d-flex">
            <RouterLink
            class="nav-link text-white"
            to="/dashboard/profile"
            >
            Perfil
          </RouterLink>
          </li>
          <li class="nav-item p-2 d-flex">
            <RouterLink class="nav-link" to="/dashboard/cart">
               <i class="fas fa-shopping-cart"></i>
            </RouterLink>
            <div class="number-products">{{ quantity }}</div>
           </li>
        <nav>
          <a 
          v-if="currentUser"
          class="btn btn-outline-info text-white my-2 my-sm-0 p-2"
           @click.prevent="signOut"
           >
           Sign Out
          </a>

           <a 
             v-if="!currentUser"
             href="/signIn"
             class="btn btn-outline-info text-white my-2 display-5 my-sm-0 p-2"
           >
           Login
          </a>
           <a 
             v-if="!currentUser"
             href="/signUp"
             class="btn btn-outline-info text-white my-2 my-sm-0 p-2"
           >
           registro
          </a>
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

