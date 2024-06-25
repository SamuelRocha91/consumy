<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Auth } from '@/utils/auth';

const auth = new Auth();

const address = ref('');
const cep = ref('');
const city = ref('');
const email = defineModel<string>('email', { default: '' });
const name = ref('');
const neighborhood = ref('');
const numberAddress = ref('');
const state = ref('');

defineProps<{
    handleClick: (param?: string) => void;
}>();

onMounted(() => {
  auth.fetchUser((data) => {
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
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3>Informações de perfil</h3>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input 
                        type="text" 
                        class="form-control" id="name" :value="name" readonly>
                    </div>
                    <div class="form-group">
                        <label for="cep">CEP</label>
                        <input
                         type="text"
                          class="form-control" 
                          id="cep" :value="cep" readonly>
                    </div>
                    <div class="form-group">
                        <label for="state">State</label>
                        <input
                         type="text"
                         class="form-control"
                         id="state" :value="state" 
                        readonly>
                    </div>
                    <div class="form-group">
                        <label for="city">City</label>
                        <input
                         type="text"
                         class="form-control" 
                         id="city"
                         :value="city" 
                         readonly>
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input 
                        type="text" 
                        class="form-control" 
                        id="address" :value="address" 
                        readonly
                        >
                    </div>
                    <div class="form-group">
                        <label for="name">numberAddress</label>
                        <input 
                        type="text"
                        class="form-control"
                        id="name" :value="numberAddress"
                        readonly
                        >
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input 
                        type="email"
                        class="form-control" 
                        id="email" :value="email" 
                        readonly>
                    </div>
                    <div class="form-group">
                        <label for="email">neighborhood</label>
                        <input type="email" 
                        class="form-control" 
                        id="email" :value="neighborhood" 
                        readonly>
                    </div>
                    <div class="form-group text-center">
                        <button
                         @click.prevent="handleClick()" 
                         type="button"
                         class="btn btn-primary mr-2"
                         >
                         Alterar
                            Dados</button>
                        <button 
                        @click.prevent="handleClick('password')" type="button" 
                        class="btn btn-secondary">Alterar
                            Senha</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
