<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Auth } from '@/utils/auth';

const { handleClick } = defineProps<{
    handleClick: (param?: string) => void;
    isFormPassword: boolean;
}>();

const address = ref('');
const auth = new Auth();
const cep = ref('');
const city = ref('');
const email = defineModel<string>('email', { default: '' });
const name = ref('');
const neighborhood = ref('');
const numberAddress = ref('');
const password = ref('');
const password_confirmation = ref('');
const state = ref('');

const cepError = ref('');
const nameError = ref('');
const emailError = ref('');
const passwordConfirmationError = ref('');
const passwordError = ref('');

const handleCep = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  cep.value = cepMask(value || '');
};

const handleEmail = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  email.value = value;
};

const handleName = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  name.value = value;
  name.value.split(' ').length >= 2
    ? (nameError.value = '')
    : (nameError.value = 'Insira um nome válido');
};

const handleNumberAddress = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  numberAddress.value = value;
};

const handlePassword = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  password.value = value;
};

const handlePasswordConfirmation = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  password_confirmation.value = value;
};

const validateEmailOnBlur = () => {
  const re = /\S+@\S+\.\S+/;
  re.test(email.value)
    ? (emailError.value = '')
    : (emailError.value = 'Insira um email válido');
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
};

const saveData = () => {
  const addressArray = {
    street: address.value,
    number: numberAddress.value,
    neighborhood: neighborhood.value,
    city: city.value,
    state: state.value,
    postal_code: cep.value,
  };

  const userId = localStorage.getItem('userId') || '[]';
  const parsedUserId = JSON.parse(userId) || 0;
  localStorage.setItem('name', JSON.stringify(name.value));
  auth.updateAddress(parsedUserId, addressArray, () => {
    handleClick();
  }, () => {
    console.log('Erro ao atualizar perfil');
  });
};

const updatePassword = () => {
  handleClick();
};

const searchCep = () => {
  const formatedCep = cep.value.replace('-', '');
  fetch(`https://viacep.com.br/ws/${formatedCep}/json/`)
    .then((data) => data.json().then((json) => {
      address.value = json.logradouro;
      state.value = json.uf;
      city.value = json.localidade;
      neighborhood.value = json.bairro;
    })).catch(() => cepError.value = "Cep inválido");
};

onMounted(() => {
  auth.fetchUser((data) => {
    const nameStorage = localStorage.getItem('name') || '[]';
    const nameParsed = JSON.parse(nameStorage);
    name.value = nameParsed;
    address.value = data.address.street;
    cep.value = data.address.postal_code;
    city.value = data.address.city;
    email.value = data.email;
    state.value = data.address.state;
    numberAddress.value = data.address.number;
    neighborhood.value = data.address.neighborhood;
    localStorage.setItem('userId', JSON.stringify(data.id));
  }, () => {
    console.log('Error fetching user data');
  });
});
</script>
<template>
  <template v-if="!isFormPassword">
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h3>Alterar dados do perfil</h3>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="name">Name</label>
                <input 
                  @change="handleName"
                  type="text"
                  class="form-control"
                  id="name" :value="name"
                  >
                <div class="div-error">
                  <span v-if="nameError"
                    class="error"
                  >
                  {{ nameError }}
                  </span>
                </div>
            </div>
            <div class="form-group d-flex flex-column">
              <label for="cep">CEP</label>
              <div class="d-flex">
                <input
                  type="text" class="form-control"
                  id="cep"
                  placeholder="Digite o CEP"
                  @change="handleCep"
                  @input="validateCepOnBlur"
                  :value="cep">
              <div 
                @click.prevent="searchCep"
                class="input-group-append">
                <span 
                class="input-group-text" 
                id="cep-search"
                ><i class="fa fa-search">
                </i>
                </span>
              </div>
            </div>
            <div class="div-error">
              <span v-if="cepError" 
                class="error"
              >
              {{ cepError }}
              </span>
            </div>
          </div>
          <div class="form-group">
            <label for="state">Estado</label>
              <input 
               type="text"
               class="form-control"
               id="state" :value="state" readonly
              />
            </div>
          <div class="form-group">
            <label for="city">Cidade</label>
            <input
              type="text"
              class="form-control"
              id="city" :value="city" 
              readonly>
          </div>
          <div class="form-group">
            <label for="address">Endereço</label>
            <input
              type="text"
              class="form-control"
              id="address" :value="address" readonly>
          </div>
          <div class="form-group">
            <label for="number">Número</label>
            <input 
              type="text" 
              class="form-control" 
              id="number" 
              :value="numberAddress"
              @change="handleNumberAddress" />
          </div>
          <div class="form-group">
            <label for="neighborhood">Bairro</label>
              <input 
              type="text"
              class="form-control" 
              id="neighborhood"
              :value="neighborhood" readonly>
          </div>
          <div class="form-group text-center">
            <button 
            type="button"
            class="btn btn-success mr-2"
            @click.prevent="saveData"
            >
            Salvar Dados
            </button>
            <button
            @click.prevent="handleClick()" 
            type="button" 
            class="btn btn-danger">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
    </template>
    <template v-else>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label for="email">Digite seu email</label>
                    <input type="email" 
                    @blur="validateEmailOnBlur" @input="handleEmail"
                     class="form-control" id="email" :value="email">
                </div>
                <div class="form-group">
                    <label for="password">Senha</label>
                    <input @blur="validatepasswordOnBlur" 
                    @change="handlePassword" 
                    type="password" class="form-control"
                    id="password" :value="password">
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Repetir a senha</label>
                    <input @input="handlePasswordConfirmation" 
                    @blur="validatepasswordConfirmationOnBlur"
                    type="password" class="form-control" 
                    id="password_confirmation" :value="password_confirmation">
                    <div class="div-error">
                        <span v-if="passwordConfirmationError" class="error">
                            {{ passwordConfirmationError }}
                        </span>
                    </div>
                </div>
                   <div class="form-group text-center">
                   <button 
                   type="button" class="btn btn-success mr-2" 
                   @click.prevent="updatePassword">
                   Salvar nova senha
                  </button>
                    <button 
                    @click.prevent="handleClick()" 
                    type="button"
                     class="btn btn-danger">
                     Cancelar
                    </button>
                </div>
            </form>
        </div>
    </template>
</template>

<style scoped>
.input-group-text:hover {
    cursor: pointer;
}
</style>