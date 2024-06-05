<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <NavBar v-if="route.path !== '/signUp' && route.path !== '/signIn'" :quantity="0"/>
  <RouterView />
</template>
