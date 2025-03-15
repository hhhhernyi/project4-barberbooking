<script setup>
// IMPORTS
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { onMounted, onUpdated, reactive, ref } from "vue";
import { useToast } from "vue-toastification";


// CONSTANTS
const router = useRouter();
const toast = useToast();
const token =localStorage.getItem('token')

// VARIABLES
const showSmallNavBar = ref(false);
let adminStatus=false;
let userId=''

if (token) {
  const decoded = JSON.parse(atob(token.split('.')[1]));
  adminStatus = decoded.payload.admin
  userId = decoded.payload._id
  console.log(decoded.payload.admin, userId) // i can check for admin status here
}
// STATE


// FUNCTIONS

function toggleSmallNavBar() {
  showSmallNavBar.value = !showSmallNavBar.value
  console.log(showSmallNavBar)
  return showSmallNavBar
}

function handleLogout() {
  localStorage.clear()
  toast.success("Logged Out")
}


</script>

<template>
  <div
    class="flex w-full max-w-[2000px] border-[2px] h-[130px]  mx-auto z-10 rounded-b-xl justify-around items-center bg-brown border-brown text-white fixed right-0 left-0"
  >
    <div><RouterLink to="/"><img src="../../assets/images/logo.png" class="rounded-[30%] h-[80px] w-[80px]"/></RouterLink></div>
    <div class="flex justify-around w-[70%] sm:hidden md:flex">
      <div v-if="token">
        <div v-if="adminStatus===true"><RouterLink to="/admin/home"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125 hover:bg-darkBrown hover:border-darkBrown">Admin</p ></RouterLink></div>
        <div v-else="adminStatus===false"><RouterLink :to="`/member/${userId}`"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125 hover:bg-darkBrown">Account</p ></RouterLink></div>
      </div>
      <RouterLink to="/"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125 hover:bg-darkBrown hover:border-darkBrown">Home</p></RouterLink>
      <RouterLink to="/services"><p  class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125 hover:bg-darkBrown hover:border-darkBrown">Services</p></RouterLink>
      <div>
        <RouterLink v-if="token" to="/book-appointment"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125 hover:bg-darkBrown hover:border-darkBrown">Book Appointment</p></RouterLink>
        <RouterLink v-else="!token" to="/auth/login-booking"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125 hover:bg-darkBrown hover:border-darkBrown">Book Appointment</p></RouterLink>
      </div>
      
      <div>
        <RouterLink v-if="!token" to="/auth/login"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125 hover:bg-darkBrown hover:border-darkBrown">Login</p ></RouterLink>
        <RouterLink v-else="token" to="/"><p @click="handleLogout" class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125 hover:bg-darkBrown hover:border-darkBrown">Logout</p ></RouterLink>
      </div>
      
      
      
    </div>

    <div @click="toggleSmallNavBar" class="md:hidden sm:block hover:cursor-pointer">
      <i class="pi pi-bars mt-1"></i>
    </div>
    

    
  </div>

    <div v-show="showSmallNavBar" class="w-[85%] mx-auto border-[2px] flex flex-col items-center bg-mediumBrown opacity-95 rounded-2xl fixed right-0 left-0 top-[140px]">
      <div v-if="token">
        <div v-if="adminStatus===true"><RouterLink to="/admin/home"><p class="py-5">Admin</p ></RouterLink></div>
        <div v-else-if="adminStatus===false"><RouterLink to="/member/home"><p class="py-5">Member</p ></RouterLink></div>
        
      </div>
      <RouterLink to="/"><p class="py-5">Home</p></RouterLink>
      <RouterLink to="/services"><p class="py-5">Services</p></RouterLink>
      <RouterLink to="/auth/login-booking"><p class="py-5">Book Appointment</p></RouterLink>
      <div>
        <RouterLink v-if="!token" to="/auth/login"><p class="p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Login</p ></RouterLink>
        <RouterLink v-else="token" to="/"><p @click="handleLogout" class="p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Logout</p ></RouterLink>
      </div>
        
      
    </div>

 

</template>
