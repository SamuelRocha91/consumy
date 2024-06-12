<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showBanner = ref(false);
const checkCookieConsent = () => {
  if (localStorage.getItem('cookiesAccepted') === 'false') {
    return;
  }
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    return;
  }
  showBanner.value = true;
};

const acceptCookies = () => {
  localStorage.setItem('cookiesAccepted', 'true');
  showBanner.value = false;
};

const rejectCookies = () => {
  localStorage.setItem('cookiesAccepted', 'false');
  showBanner.value = false;
};

onMounted(() => {
  checkCookieConsent();
});


</script>

<template>
  <div v-if="showBanner" id="cookie-banner" class="cookie-banner">
    <p>Usamos cookies para melhorar sua experiência. Ao continuar navegando, você aceita nossa <a href="#">política de cookies</a>.</p>
    <button @click="acceptCookies">Aceitar</button>
    <button @click="rejectCookies">Recusar</button>
  </div>
</template>

<style>
.cookie-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  z-index: 1000;
}
</style>
