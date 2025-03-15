<script setup>
//IMPORT
import { RouterLink, useRouter } from 'vue-router';

import { reactive } from 'vue';
import * as authService from '../../services/authService'
import { useToast } from 'vue-toastification';

// CONSTANTS
const toast = useToast();
const router = useRouter();
const formData = reactive({
    email:'',
    password:''
});

// VARIABLES

// FUNCTIONS
async function handleSubmitSignUp() {
    console.log(formData)
    try {
        const loggedInAdmin = await authService.logInAdmin(formData)
        console.log('logged in admin: ', loggedInAdmin)
        toast.success('welcome admin')
        router.push('/admin/home')

    } catch (error) {
        console.log(error)
        toast.error('invalid credentials')
    }
}
</script>

<template>
    <div class="w-full h-[600px] flex justify-center items-center">
        <div class="w-[90%] max-w-[400px] h-[500px] flex flex-col justify-center items-center bg-white shadow-2xl rounded-2xl">
            <h1>ADMIN LOGIN</h1>
            <form @submit.prevent="handleSubmitSignUp" class="flex flex-col justify-center w-full p-2">
            <label for="email">Email: </label>
            <input id="email" name="email" v-model="formData.email" placeholder="Email" type="email" class="bg-white border-[2px] px-2 rounded-xl"></input><br/>

            <label for="password">Password: </label>
            <input is="password" name="password" v-model="formData.password" placeholder="Password" type="password" class="bg-white border-[2px] px-2 rounded-xl"></input><br/>

            <button type="submit" class="bg-brown border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Log In</button>
        </form>
        </div>
        

        
    </div>
</template>