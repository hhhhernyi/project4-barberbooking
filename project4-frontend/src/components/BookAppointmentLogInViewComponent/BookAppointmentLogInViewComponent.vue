<script setup>
//IMPORT
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import * as authService from '../../services/authService'

// CONSTANTS
const toast = useToast();
const router = useRouter();

// VARIABLES
const formData = reactive({
    email: '',
    password:''
})

// FUNCTIONS
async function handleSubmitSignin() {
    console.log('form: ',formData)
    try {
        const loggedInUser = await authService.logInUser(formData)
        console.log('user logged in: ', loggedInUser)
        toast.success('Welcome!')
        router.push('/book-appointment')
    } catch (error) {
        console.log(error)
        toast.error('Invalid credentials')
    }
    
}
</script>

<template>
    <div class="w-full h-[700px] flex justify-center items-center">
        <div class="w-[80%] max-w-[400px] h-[400px] flex justify-center items-center rounded-2xl shadow-2xl bg-white">
        <form @submit.prevent="handleSubmitSignUp" class="flex flex-col w-[90%]">
            <label for="email">Email: </label>
            <input id="email" name="email" v-model="formData.email" type="email" placeholder="Email" class="bg-white border-[2px] px-2 rounded-2xl"></input><br/>

            <label for="password">Password: </label>
            <input id="password" name="password" v-model="formData.password" type="password" placeholder="password" class="bg-white border-[2px] px-2 rounded-2xl"></input><br/>

            <button type="submit" @click="handleSubmitSignin"class="border-[2px] p-2 my-2 rounded-2xl cursor-pointer bg-brown active:bg-amber-400">Log In</button>
            <button class="border-[2px] p-2 my-2 rounded-2xl bg-brown cursor-pointer active:bg-amber-400"><RouterLink to="/book-appointment">Continue as Guest</RouterLink></button>
            <p class="underline underline-offset-4">No account yet?</p>
            <button  class="border-[2px] p-2 my-2 rounded-2xl bg-brown cursor-pointer active:bg-amber-400"><RouterLink to="/auth/signup"> Sign up now!</RouterLink></button>
        </form>
        </div>
            
    </div>
    <div class="flex justify-center mb-10">
        
    </div>
</template>