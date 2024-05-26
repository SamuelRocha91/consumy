<script setup lang="ts">
import UserProfile from '../components/UserProfile.vue'
</script>

<template>
  <main class="main-content">
    <UserProfile />
  </main>
</template>

<style scoped>
.link-sign {
  text-decoration: double;
}

.main-content {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/vovo.jpg');
  background-size: cover;
}

</style>