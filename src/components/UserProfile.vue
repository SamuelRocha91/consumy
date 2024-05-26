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
  <main>
    <template v-if="isLoggedIn">
      <h3>Hi, {{ currentUser && currentUser.email }}</h3>
      <br />
      <nav>
        <a @click="signOut">Sign Out</a>
      </nav>
    </template>
    <template v-else>
      <nav>
        <RouterLink :to="{name: 'signIn'}">Login</RouterLink>
        <RouterLink :to="{name: 'signIn'}">Registro</RouterLink>
      </nav>
      <section class="food-text">
          <h3>Comida boa e gostozinha, quem preparou foi a vovozinha</h3>
      </section>
    </template>
  </main>
</template>

<style scoped>
h3 {
  color: white;
  font-size: 32px;
  font-weight: bold;
}

.food-text {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  text-align: center;
  border: 1px solid white;
  background-color: black;
  font-family: monospace;
}

nav {
  display: flex;
  width: 100vw;
  justify-content: flex-end;
  gap: 35px;
  color: white;
  padding: 35px;
}

nav a {
  border: 1px solid white;
  padding: 15px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  border-radius: 15px;
}

nav a:hover {
  background-color: rgb(0, 0, 0);
  transition: 5s;
}
</style>
