<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import ProfileData from '@/components/ProfileData.vue';
import FormProfile from '@/components/FormProfile.vue';

const isFormPassword = ref(false);

const managerPages = (param = 'update') => {
  isEdit.value = !isEdit.value
  if (param == 'update') {
    isFormPassword.value = false;
  } else {
    isFormPassword.value = true;
  }
}
const isEdit = ref(false);
</script>
<template>
  <NavBar />
  <FormProfile :handleClick="managerPages" v-if="isEdit" :isFormPassword="isFormPassword" />
  <ProfileData v-else :handleClick="managerPages" />
</template>

<style scoped>
</style>