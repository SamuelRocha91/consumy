<script setup lang="ts">
import { onMounted, ref } from 'vue';

const email = defineModel<string>('email', { default: '' })
const cep = ref('');
const name = ref('');
const state = ref('');
const city = ref('');
const address = ref('');
const neighborhood = ref('');
const numberAddress = ref('');

onMounted(() => {
    const user = localStorage.getItem('buyer') || '';
    const parseUser = user ? JSON.parse(user) : '';
    if (parseUser) {
        email.value = parseUser.email;
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
            <h3>Informações de perfil</h3>
        </div>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" :value="name" readonly>
                </div>
                <div class="form-group">
                    <label for="cep">CEP</label>
                    <input type="text" class="form-control" id="cep" :value="cep" readonly>
                </div>
                <div class="form-group">
                    <label for="state">State</label>
                    <input type="text" class="form-control" id="state" :value="state" readonly>
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" :value="city" readonly>
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" :value="address" readonly>
                </div>
                <div class="form-group">
                    <label for="name">numberAddress</label>
                    <input type="text" class="form-control" id="name" :value="numberAddress" readonly>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" :value="email" readonly>
                </div>
                <div class="form-group">
                    <label for="email">neighborhood</label>
                    <input type="email" class="form-control" id="email" :value="neighborhood" readonly>
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