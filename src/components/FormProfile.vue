<script setup lang="ts">
import { onMounted, ref } from 'vue';

const cep = ref('');
const name = ref('');
const state = ref('');
const city = ref('');
const address = ref('');
const neighborhood = ref('');
const numberAddress = ref('');

const cepError = ref('');
const nameError = ref('');

const validateCepOnBlur = () => {
    cep.value.length === 9 ?
        (cepError.value = '') :
        (cepError.value = 'Dado incompleto');
};

const handleNumberAddress = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    numberAddress.value = value;
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

const handleName = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    name.value = value;
    name.value.split(' ').length >= 2
        ? (nameError.value = '')
        : (nameError.value = 'Insira um nome válido');
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

onMounted(() => {
    const user = localStorage.getItem('buyer') || '';
    const parseUser = user ? JSON.parse(user) : '';
    if (parseUser) {
        name.value = parseUser.name
        cep.value = parseUser.cep
        state.value = parseUser.state
        city.value = parseUser.city
        address.value = parseUser.address
        neighborhood.value = parseUser.neighborhood
        numberAddress.value = parseUser.numberAddress
    }
})
</script>
<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3>Alterar dados do perfil</h3>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input @change="handleName" type="text" class="form-control" id="name" :value="name">
                        <div class="div-error">
                            <span v-if="nameError" class="error">{{ nameError }}</span>
                        </div>
                    </div>
                    <div class="form-group d-flex">
                        <label for="cep">CEP</label>
                        <input type="text" class="form-control" id="cep" placeholder="Digite o CEP" @change="handleCep"
                            @input="validateCepOnBlur" :value="cep">
                        <div @click.prevent="searchCep" class="input-group-append">
                            <span class="input-group-text" id="cep-search"><i class="fa fa-search"></i></span>
                        </div>
                        <div class="div-error">
                            <span v-if="cepError" class="error">{{ cepError }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="state">Estado</label>
                        <input type="text" class="form-control" id="state" :value="state" />
                    </div>
                    <div class="form-group">
                        <label for="city">Cidade</label>
                        <input type="text" class="form-control" id="city" :value="city">
                    </div>
                    <div class="form-group">
                        <label for="address">Endereço</label>
                        <input type="text" class="form-control" id="address" :value="address">
                    </div>
                    <div class="form-group">
                        <label for="number">Número</label>
                        <input type="text" class="form-control" id="number" :value="numberAddress"
                            @change="handleNumberAddress" />
                    </div>
                    <div class="form-group">
                        <label for="neighborhood">Bairro</label>
                        <input type="text" class="form-control" id="neighborhood" :value="neighborhood" readonly>
                    </div>
                    <div class="form-group text-center">
                        <button type="button" class="btn btn-primary mr-2">Alterar Dados</button>
                        <button type="button" class="btn btn-secondary">Alterar Senha</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>