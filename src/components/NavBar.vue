 <script setup lang="ts">
import { Auth } from '../auth';
import { ref } from 'vue';

const auth = new Auth();
const isLoggedIn = ref(auth.isLoggedIn());

const currentUser = ref(auth.currentUser());
const signOut = function () {
  auth.signOut(() => (isLoggedIn.value = auth.isLoggedIn()))
}
</script>
<template>
    <nav class="navbar navbar-dark bg-dark px-3 p-2 d-flex align-items-center">
        <h3 class="navbar-brand p-2">Olá, {{ currentUser && currentUser.email }}</h3>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link" href="">Home</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link" href="">Pedidos</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link" href="">Quero comer</a>
          </li>
          <li class="nav-item p-2 d-flex">
            <a class="nav-link" href="">Perfil</a>
          </li>
        <nav>
          <a class="btn btn-outline-info text-info my-2 my-sm-0 p-2" @click="signOut">Sign Out</a>
        </nav>
    </nav>
</template>

