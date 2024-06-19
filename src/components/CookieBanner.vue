<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showPolicy = ref(false);
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

const togglePolicy = () => {
  showPolicy.value = !showPolicy.value;
};

onMounted(() => {
  checkCookieConsent();
});


</script>

<template>
  <div v-if="showBanner" id="cookie-banner" class="cookie-banner">
    <p>Usamos cookies para melhorar sua experiência. Ao continuar navegando, você aceita nossa<button class="link-policy" @click="togglePolicy">política de cookies</button>.</p>
    <div v-if="showPolicy">
      <h3>Política de cookies</h3>
      <p>Nosso site utiliza cookies para melhorar sua experiência de navegação. Os cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam a:</p>
      <ul>
        <li>Entender como você usa nosso site</li>
        <li>Personalizar o conteúdo e a publicidade</li>
        <li>Oferecer recursos de redes sociais</li>
        <li>Analizar o tráfego do site</li>
      </ul>
    </div>
    <div class="btns-init">
      <button class="btn btn-primary" @click="acceptCookies">Aceitar</button>
      <button  class="btn btn-danger" @click="rejectCookies">Recusar</button>
    </div>
  </div>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  z-index: 1000;
}

.btns-init {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 2px;
}

.link-policy {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  border: none;
}

ul {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
