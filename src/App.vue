<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import { useRoute } from 'vue-router';
import { useSharedRefs } from '@/utils/useSharedRefs';

const route = useRoute();
const quantity = useSharedRefs().quantity;

</script>

<template>
  <NavBar v-if="route.path !== '/signUp' && route.path !== '/signIn'" :quantity="quantity"/>
  <RouterView />
</template>
