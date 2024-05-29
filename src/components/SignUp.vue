<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../utils/auth'
import Swal from 'sweetalert2';

const router = useRouter();

const email = defineModel<string>('email', { default: '' })
const password = ref('')
const password_confirmation =  ref('')
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

const handleNumberAddress = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  numberAddress.value = value;
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

const handleEmail = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  email.value = value;
};

const handlePassword = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  password.value = value;
};

const handlePasswordConfirmation = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  password_confirmation.value = value;
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

const validateFields = () => {

  return passwordConfirmationError.value.length > 0 ||
    passwordError.value.length > 0  ||
    nameError.value.length > 0  ||
    cepError.value.length > 0  ||
    !cep.value ||
    !numberAddress.value ||
    emailError.value.length > 0 

}

const onSubmit = () => {
  if (validateFields()) {
    Swal.fire({
      title: `Preencha todos os campos corretamente`,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return
  }
  const buyer = {
    name: name.value,
    email: email.value,
    address: address.value,
    city: city.value,
    state: state.value,
    neighborhood: neighborhood.value,
    numberAddress: numberAddress.value,
    cep: cep.value,
  }
  localStorage.setItem('buyer', JSON.stringify(buyer))
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
  <div class="form-container">
    <div class="container mt-5 d-flex justify-content-center">
      <div class="card">
        <div class="card-header text-center">
          <h1>Sign Up</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="name">Nome</label>
              <input @blur="handleName" type="text" class="form-control" id="name" :value="name">
              <div class="div-error">
                <span v-if="nameError" class="error">{{ nameError }}</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="cep">CEP</label>
                <div class="input-group">
                  <input @blur="validateCepOnBlur" @input="handleCep" type="text" class="form-control" id="cep" placeholder="Digite o CEP" :value="cep">
                  <div class="input-group-append">
                    <button @click.prevent="searchCep" class="btn btn-outline-secondary" id="cep-search">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div class="div-error">
                  <span v-if="cepError" class="error">{{ cepError }}</span>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="city">Cidade</label>
                <input type="text" class="form-control" id="city" :value="city" readonly>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="state">Estado</label>
                <input type="text" class="form-control" id="state" :value="state" readonly>
              </div>
              <div class="form-group col-md-6">
                <label for="address">Endereço</label>
                <input type="text" class="form-control" id="address" :value="address" readonly>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="neighborhood">Bairro</label>
                <input type="text" class="form-control" id="neighborhood" :value="neighborhood" readonly>
              </div>
              <div class="form-group col-md-6">
                <label for="numberAddress">Número</label>
                <input @change="handleNumberAddress" type="text" class="form-control" id="numberAddress" :value="numberAddress">
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input @input="handleEmail" @blur="validateEmailOnBlur" type="email" class="form-control" id="email" :value="email">
              <div class="div-error">
                <span v-if="emailError" class="error">{{ emailError }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Senha</label>
              <input @blur="validatepasswordOnBlur" @change="handlePassword" type="password" class="form-control" id="password" :value="password">
            </div>
            <div class="form-group">
              <label for="password_confirmation">Repetir a senha</label>
              <input @input="handlePasswordConfirmation" @blur="validatepasswordConfirmationOnBlur"  type="password" class="form-control" id="password_confirmation" :value="password_confirmation">
              <div class="div-error">
                <span v-if="passwordConfirmationError" class="error">{{ passwordConfirmationError }}</span>
              </div>
            </div>
            <div class="form-group form-check">
              <input v-model="remember" type="checkbox" class="form-check-input" id="remember">
              <label class="form-check-label" for="remember">Remember Me</label>
            </div>
            <button type="submit" class="btn btn-primary btn-block" v-show="!awaiting">Registrar</button>
          </form>
          <div class="text-center mt-3">
            <p>
              Já possui cadastro?
              <RouterLink class="router" to="/signIn">
                Fazer login
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container{
  background-image: url('../assets/pizza.jpg');
  display: flex;
  flex-direction: column;
  width: 100vw;
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

.links-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  gap: 20px;
}

.label-register {
  height: 89px;
  padding: 10px;
}

.div-error {
  height:0.700em;
}
.error {
  display: block;
  font-size: 0.875em; 
  color: red;
}
</style>