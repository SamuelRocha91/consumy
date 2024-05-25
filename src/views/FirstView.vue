<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FirstComponent from '../components/FirstComponent.vue' 
const stores = ref()
onMounted(() => {
    fetch("http://127.0.0.1:3000/stores.json", { method:"GET",
headers: {
            "Content-Type": "application/json"
    }}).then((response) => response.json()).then((data) => stores.value = data)
})
</script>

<template>
 <FirstComponent message="Hola"/>
 <div v-if="stores">
    <h1 v-for="store in stores" :key="store.name">{{ store.name }}</h1>
 </div>
</template>