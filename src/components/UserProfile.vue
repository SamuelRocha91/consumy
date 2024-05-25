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
      <h3>Por favor, faça login para ter acesso</h3>
      <br />
      <nav>
        <RouterLink :to="{name: 'signIn'}"> Sign In </RouterLink>
      </nav>
    </template>
  </main>
</template>
