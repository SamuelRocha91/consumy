<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Auth } from '../utils/auth';
import Swal from 'sweetalert2';

const awaiting = ref(false);
const email = defineModel<string>('email');
const password = defineModel<string>('password');
const remember = defineModel<boolean>('remember', { default: true });
const router = useRouter();

const onSubmit = () => {
  let auth = new Auth(remember.value);
  awaiting.value = true;
  auth.signIn(
    email.value || '',
    password.value || '',
    () => {
      awaiting.value = false;
      router.push('/dashboard');
    },
    (erro: any) => {
      awaiting.value = false;
      console.error('Request failed:', erro);
      Swal.fire('Falha ao tentar fazer login. Favor, verifique seus dados');
    }
  );
};
</script>
<template>
  <div class="form-content">
    <div class="card-content">
      <h1>Sign In</h1>
      <form @submit.prevent="onSubmit">
        <label>E-Mail: </label>
        <input v-model="email" type="email" /><br />
        <label>Senha: </label>
        <input v-model="password" type="password" /><br />
        <div>
          <label>Remember Me: </label>
          <input v-model="remember" type="checkbox" /><br />
        </div>
        <button
         type="submit" 
         class="btn btn-primary btn-block" 
         v-show="!awaiting"
         >
         Sign In
        </button>
      </form>
        <div class="text-center mt-3">
            <p>
              Não possui cadastro?
              <RouterLink class="router" to="/signUp">
                Faça o registro
              </RouterLink>
            </p>
          </div>
    </div>
  </div>
</template>

<style scoped>
.form-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 4px;
  background-image: url('../assets/burgers.webp');
  background-size: cover;
}

h1 {
  color: black;
  font-size: 32px;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.548);
  font-weight: 900;
}

.card-content {
  padding: 20px;
  box-shadow: 1px 3px 2px black;
  background-color: white;
}

</style>
