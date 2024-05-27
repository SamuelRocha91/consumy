<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import ProfileData from '@/components/ProfileData.vue';
import FormProfile from '@/components/FormProfile.vue';

const isEdit = ref(false);
</script>
<template>
  <NavBar />
  <FormProfile v-if="isEdit" />
  <ProfileData v-else/>
</template>

<style scoped>
</style>