<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'

const router = useRouter();

const email = defineModel<string>('email', {default: ''})
const password = defineModel<string>('password', {default: ''})
const password_confirmation = defineModel<string>('password_confirmation');
const cep = ref('');
const name = ref('');

const awaiting = ref(false)
const remember = defineModel<boolean>('remember', { default: true })

const passwordConfirmationError = ref('');
const passwordError = ref('');
const cepError = ref('');
const nameError = ref('');
const emailError = ref('');


const validateCepOnBlur = () => {
  cep.value.length === 9 ?
    (cepError.value = '') :
    (cepError.value = 'Dado incompleto');
};

const cepMask = (value: string) => {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{3})$/, '$1-$2');
  return value;
}

const handleCep = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  cep.value = cepMask(value || '');
};


const validateEmailOnBlur = () => {
  const re = /\S+@\S+\.\S+/;
  re.test(email.value)
    ? (emailError.value = '')
    : (emailError.value = 'Insira um email válido');
};

const handleName = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  name.value = value;
  name.value.split(' ').length >= 2
    ? (nameError.value = '')
    : (nameError.value = 'Insira um nome válido');
};

const validatepasswordOnBlur = () => {
  password.value.length < 6
    ? (passwordError.value = 'Mínimo de 6 caracteres')
    : (passwordError.value = '');
};

const validatepasswordConfirmationOnBlur = () => {
  password_confirmation.value === password.value
    ? (passwordConfirmationError.value = '')
    : (passwordConfirmationError.value = 'Senhas não coincidem');
};

const onSubmit = () => {
  const auth = new Auth(remember.value);
  awaiting.value = true;
  auth.signUp(
    email.value || '',
    password.value || '',
    password_confirmation.value || '',
    () => {
      awaiting.value = false;
      router.push('/signIn')
    },
    () => {
      awaiting.value = false;
    });
};

</script>
<template>
  <div class="form-content">
    <div class="card-content">
      <h1>Sign Up</h1>
      <form @submit.prevent="onSubmit">
      <label for="name-total" class="label-register">
        <p>Digite seu nome</p>
        <input
          type="text"
          name="name-total"
          id="name-total"
          placeholder="Samuel Soares Rocha"
          :value="name"
          @blur="handleName"
        />
         <div class="div-error">
           <span v-if="nameError" class="error">{{ nameError }}</span>
         </div>
      </label>
      <label for="cep" class="label-register">
        <p>CEP</p>
        <input
          type="text"
          name="cep"
          id="cep"
          placeholder="xxxxx-xxx"
          :value="cep"
          @input="handleCep"
          maxlength="9"
          @blur="validateCepOnBlur"
        />
        <div class="div-error">
          <span v-if="cepError" class="error">{{ cepError }}</span>
        </div>
      </label>
      <label for="email" class="label-register">
        <p>Email</p>
        <input
          v-model="email"
          type="email"
          name="email"
          id="email"
          @blur="validateEmailOnBlur"
          placeholder="email@example.com"
        />
        <div class="div-error">
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
      </label>
      <label for="password" class="label-register">
        <p>Senha</p>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          @blur="validatepasswordOnBlur"
        />
        <div class="div-error">
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
      </label>
      <label for="password_confirmation" class="label-register">
        <p>Confirme sua senha</p>
        <input
          v-model="password_confirmation"
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          placeholder="*********"
          @blur="validatepasswordConfirmationOnBlur"
        />
        <div class="div-error">
          <span v-if="passwordConfirmationError" class="error">{{
            passwordConfirmationError
          }}</span>
        </div>
      </label>
      <div>
        <label>Remember Me: </label>
        <input v-model="remember" type="checkbox" />
      </div>
      <button type="submit" v-show="!awaiting">Registrar</button>
     </form>
    </div>
  </div>
</template>
<style scoped>
.form-content {
    background-image: url('../assets/pizza.jpg');
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 4px;
    background-size: cover;
}

form {
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.548);
  font-weight: 900;
  justify-content: center;
  width: 350px;
  align-items: center;
}

.card-content {
  padding: 40px;
  box-shadow: 1px 3px 2px black;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
   align-items: center;
  opacity: 0.8;
}

.label-register{
  height: 89px;
  padding: 10px;
}
</style>