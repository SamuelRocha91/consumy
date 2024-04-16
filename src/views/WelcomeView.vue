<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { auth } from '../auth';
import { ref } from 'vue';
const currentUser = ref(auth.currentUser())
const signOut = function () {
  auth.signOut(() => {
    currentUser.value = auth.currentUser()
  })
 }
</script>

<template>
  <main>
    <h1>Delivery: Welcome</h1>
    <template v-if="currentUser">
      <h3>Hi, {{ currentUser.email }}</h3>
      <br />
      <nav>
        <a @click="signOut">Sign Out</a>
      </nav>
    </template>
    <template v-else>
      <nav>
        <RouterLink :to="{ name: 'signIn'}">
          Sign In
        </RouterLink>
      </nav>
    </template>
  </main>
</template>

<style scoped>
.link-sign {
  text-decoration: double;
}
</style>