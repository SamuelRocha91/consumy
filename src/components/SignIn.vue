<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { auth } from '../auth'

const router = useRouter()
const email = defineModel('email')
const password = defineModel('password')
const awaiting = ref(false)

function onSubmit(form: any) {
    console.log(form)
    awaiting.value = true
    auth.signIn(
        email.value as string,
        password.value as string,
        () => {
        awaiting.value = false;
        router.push('/')
    })
}

</script>

<template>
    <div>
        <h1>Sign in</h1>
        <form @submit.prevent="onSubmit">
            <div>
                <label>Email:</label>
                <input type="email" v-model="email">
            </div>
             <div>
                 <label>Password:</label>
                 <input type="password" v-model="password">
             </div>

            <button type="submit" v-show="!awaiting">Sign in</button>
        </form>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
}

</style>