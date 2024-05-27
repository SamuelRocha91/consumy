 <script setup lang="ts">
import { useRouter } from 'vue-router';
import { Auth } from '../auth';
import { ref } from 'vue';

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
    <nav class="navbar navbar-dark bg-dark px-3 p-2 d-flex align-items-center">
        <h3 class="navbar-brand p-2">Olá, {{ currentUser && currentUser.email }}</h3>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link" href="/dashboard">Home</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link" href="">Pedidos</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link" href="/dashboard/rango">Quero comer</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link" href="/dashboard/profile">Perfil</a>
          </li>
        <nav>
          <a class="btn btn-outline-info text-info my-2 my-sm-0 p-2" @click.prevent="signOut">Sign Out</a>
        </nav>
    </nav>
</template>

