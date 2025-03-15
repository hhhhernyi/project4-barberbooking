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
async function handleSubmitSignIn() {
    console.log(formData)
    try {
        const loggedInUser = await authService.logInUser(formData)
        console.log('user logged in: ', loggedInUser)
        toast.success('Welcome!')
        router.push('/member/home')
    } catch (error) {
        console.log(error)
        toast.error('Invalid credentials')
    }
    
}
</script>

<template>
    <div class="w-full h-[600px] flex justify-center items-center">
        <div class="w-[400px] h-[500px] bg-white  rounded-2xl flex flex-col justify-center items-center shadow-2xl ">
            <h1>MEMBERS LOG IN</h1>
            <form @submit.prevent="handleSubmitSignIn" class="flex flex-col w-full p-2">
            <label for="email">Email: </label>
            <input v-model="formData.email" id="email" name="email" type="email" placeholder="Email" class="bg-white border-[2px] px-2 rounded-2xl"></input><br/>

            <label for="password">Password: </label>
            <input v-model="formData.password" id="password" name="password" type="password" placeholder="Password" class="bg-white border-[2px] px-2 rounded-2xl"></input><br/>


            <button type="submit" class="border-[2px] p-2 rounded-2xl cursor-pointer bg-brown active:bg-amber-400">Log In</button>
            </form>  
            <p>No account yet?</p>
            <button class="w-[97%] border-[2px] p-2 rounded-2xl cursor-pointer bg-brown active:bg-amber-400"><RouterLink to="/auth/signup">Sign up now!</RouterLink></button>        
        </div>        
    </div>
</template>