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
                <div class="form-group text-center">
                    <img src="" alt="Profile Image" class="img-thumbnail" style="width: 150px; height: 150px;">
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" value="Samuel Rocha" >
                </div>
                <div class="form-group d-flex">
                    <input type="text" class="form-control" id="cep" placeholder="Digite o CEP">
                        <div class="input-group-append">
                            <span class="input-group-text" id="cep-search"><i class="fa fa-search"></i></span>
                        </div>
                </div>
                <div class="form-group">
                    <label for="state">State</label>
                    <input type="text" class="form-control" id="state" value="Bahia" >
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" value="Salvador" >
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" value="Rua Travasso do Meio, 27, Bonfim" >
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" value="samuel@example.com" >
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