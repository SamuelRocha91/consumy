<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { auth } from '../auth'
const router = useRouter();
const email = defineModel<string>('email');
const password = defineModel<string>('password');
const awaiting = ref(false);

function onSubmit() {
    awaiting.value = true
    auth.signIn(email.value || '', password.value || '', () => {
        awaiting.value = false
        router.push('/')
    }, () => {
        awaiting.value = false
        console.log('não foi dessa vez!')
    })
}
</script>
<template>
    <div>
        <h1>Sign In</h1>
        <form @submit.prevent="onSubmit">
            <label>E-Mail: </label>
            <input v-model="email" type="email"><br />
            <label>Senha: </label>
            <input v-model="password" type="password"><br />
            <button type="submit" v-show="!awaiting">
                Sign In</button>
        </form>
    </div>
</template>