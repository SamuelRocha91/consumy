<script setup lang="ts">
import { useRouter } from 'vue-router';
const route = useRouter();

const handleClick = () => {
  route.push('/dashboard/stores');
};
</script>

<template>
  <main class="main-content">
    <div class="d-flex h-100 flex-column justify-content-center text-light">
      <div class="bg-dark h-40 d-flex flex-column p-3 justify-content-center">
        <h1>Mate a fome agora!</h1>
        <p>Seja você também um assassino da desnutrição</p>
          <button @click.prevent="handleClick">Quero comer urgente!</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.link-sign {
  text-decoration: double;
}

.main-content {
  display: flex;
  width: 100vw;
  height: 92.5vh;
  background-image: url('../assets/vovo.jpg');
  background-size: cover;
}

.main-content {
  display: flex;
  width: 100vw;
  height: 92.5vh;
  background-image: url('../assets/vovo.jpg');
  background-size: cover;
  justify-content: center; 
  align-items: center; 
  text-align: center;
}

.main-content h1 {
  font-size: 3.5em; 
  margin-bottom: 10px;
  font-weight: bold;
}

.main-content p {
  font-size: 1.8em; 
  margin-bottom: 20px; 
  font-weight: bold;
}

.main-content button {
  padding: 10px 20px;
  font-size: 1.2em; 
  background-color: #007bff;
  color: #fff;
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s ease; 
}

.main-content button:hover {
  background-color: #0056b3; /* Cor de fundo azul mais escura no hover */
}
</style>