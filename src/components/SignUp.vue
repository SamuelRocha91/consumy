<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'

const router = useRouter();

const email = defineModel<string>('email', { default: '' })
const password = defineModel<string>('password', { default: '' })
const password_confirmation = defineModel<string>('password_confirmation');
const cep = ref('');
const name = ref('');
const state = ref('');
const city = ref('');
const address = ref('');
const awaiting = ref(false)
const remember = defineModel<boolean>('remember', { default: true })
const neighborhood = ref('');
const numberAddress = ref('');

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

const searchCep = () => {
  const formatedCep = cep.value.replace('-', '')
  fetch(`https://viacep.com.br/ws/${formatedCep}/json/`).then((data) => data.json().then((json) => {
    address.value = json.logradouro
    state.value = json.uf
    city.value = json.localidade
    neighborhood.value = json.bairro
  })).catch(() => cepError.value = "Cep inválido")
}


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
    <div class="card-content  d-flex align-items-center">
      <h1>Sign Up</h1>
      <div class="card-body d-flex align-items-center w-100">
        <form @submit.prevent="onSubmit">
          <div class="input-group d-flex align-items-center justify-content-center w-100">
            <div class="form-group">
              <label for="name">Name</label>
              <input @blur="handleName" type="text" class="form-control" id="name" :value="name">
              <div class="div-error">
                <span v-if="nameError" class="error">{{ nameError }}</span>
              </div>
            </div>
            <div class="form-group d-flex ml-4 ">
              <input @blur="validateCepOnBlur" @input="handleCep" type="text" class="form-control ml-3" id="cep"
                placeholder="Digite o CEP" :value="cep">
              <div class="input-group-append">
                <span @click.prevent="searchCep" class="input-group-text" id="cep-search"><i
                    class="fa fa-search"></i></span>
              </div>
              <div class="div-error">
                <span v-if="cepError" class="error">{{ cepError }}</span>
              </div>
            </div>
            <div class="form-group d-flex">
              <label for="city">Cidade
                <input type="text" class="form-control" id="city" :value="city" readonly>
              </label>
              <label for="state">Estado
                <input type="text" class="form-control" id="state" :value="state" readonly>
              </label>
            </div>
            <div class="form-group">
              <label for="address">Endereço
                <input type="text" class="form-control" id="address" :value="address" readonly>
              </label>
            </div>
            <div class="form-group  d-flex">
              <label for="address">Bairro
                <input type="text" class="form-control" id="address" :value="neighborhood" readonly>
              </label>
              <label for="address">Número
                <input type="text" class="form-control" id="address" :value="numberAddress">
              </label>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input @blur="validateEmailOnBlur" type="email" class="form-control" id="email" :value="email">
              <div class="div-error">
                <span v-if="emailError" class="error">{{ emailError }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Senha</label>
              <input @blur="validatepasswordOnBlur" type="password" class="form-control" id="email" :value="password">
            </div>
            <div class="form-group">
              <label for="email">Repetir a senha</label>
              <input @blur="validatepasswordConfirmationOnBlur" type="password" class="form-control" id="email"
                :value="password_confirmation">
              <div class="div-error">
                <span v-if="passwordConfirmationError" class="error">{{
          passwordConfirmationError
        }}</span>
              </div>
            </div>
            <div>
              <label>Remember Me: </label>
              <input v-model="remember" type="checkbox" />
            </div>
          </div>
          <button type="submit" v-show="!awaiting">Registrar</button>
        </form>
      </div>
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

.label-register {
  height: 89px;
  padding: 10px;
}

.div-error {
  height: 10px;
  display: flex;
  align-items: center;
  color: #ff1818;

}

.error {
  color: #ff1818;
  font-size: x-small;
  transition: max-height 0.2s ease;
}
</style>