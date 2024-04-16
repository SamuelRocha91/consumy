<script setup lang="ts">
import { auth } from '../auth'
import { ref } from 'vue'
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())
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
      <h3>Please log in to have access</h3>
      <br />
      <nav>
        <RouterLink :to="{name: ‘signin'}"> Sign In </RouterLink>
      </nav>
    </template>
  </main>
</template>
