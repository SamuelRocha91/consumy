<script setup lang="ts">
  const message = defineModel('message', { default: "Hello world" })
const limpar = () => {
  message.value = '';
  }
</script>

<template>
    <div id="letsGo">
      <h1>Meu primeiro componente</h1>
      <div>
          Dizendo olá, para variar: {{ message }}
      </div>
      <input v-model="message" type="text">
      <button @click="limpar">Limpar</button>
    </div>
</template>

<style scoped>
  #letsGo {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>