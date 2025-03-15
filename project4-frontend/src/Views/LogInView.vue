<script setup>
import { ref } from 'vue';
import LogInViewComponent from '../components/LogInViewComponents/LogInViewComponent.vue';
import AdminLogInView from './AdminLogInView.vue';

const memberLogin = ref(true)
const adminLogin = ref(false)

function toggleLogIn() {
    memberLogin.value = !memberLogin.value
    adminLogin.value = !adminLogin.value
    console.log('admin: ', adminLogin.value)
    console.log("member: ", memberLogin.value)
}

</script>


<template>
    <div class="flex flex-col justify-center w-full h-full">
        <div class="flex justify-center mt-50">
        <button @click="toggleLogIn" class="w-[300px] h-[50px] border-[2px] flex justify-around items-center bg-darkBrown rounded-4xl">
            <p :class="[memberLogin === true? 'bg-brown h-[90%] w-[70%] flex items-center justify-center rounded-4xl ml-1 animate-shake animate-fade-left animate-ease-in-out animate-duration-300 animate-once':' h-[90%] w-[50%] flex items-center justify-center mx-2' ]">MEMBER</p> 
            <p :class="[adminLogin === true? 'bg-brown h-[90%] w-[70%] flex items-center justify-center rounded-4xl mr-1 animate-shake animate-fade-right animate-ease-in-out animate-duration-300 animate-once' :' h-[90%] w-[50%] flex items-center justify-center mx-2' ]">ADMIN</p> 
            
        </button>
        </div>
        
        <div v-if="memberLogin === true">
        <LogInViewComponent />
        </div>

        <div v-else>
        <AdminLogInView />
        </div>

    </div>
    
    
    
</template>