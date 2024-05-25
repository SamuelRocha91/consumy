<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <h1> Delivery: Welcome</h1>
    <nav>
        <RouterLink class="link-sign" :to="{name: 'signIn'}">Sign in</RouterLink>
    </nav>
  </main>
</template>

<style scoped>
  .link-sign {
    text-decoration: double;
  }
</style>