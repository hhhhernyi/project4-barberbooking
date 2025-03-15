<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[800px]">
    <div
      class="bg-[url('/images/heroBG.png')] bg-cover bg-center sm:rounded-b-[15%] md:rounded-b-none md:rounded-br-[15%] h-[400px] md:h-full animate-fade-right animate-once animate-duration-[900ms] animate-delay-200 animate-ease-out"
    ></div>
    <div class="flex flex-col justify-center items-center p-4 animate-fade-left animate-once animate-duration-[700ms] animate-delay-100 animate-ease-in">
      <div class="text-darkBrown text-center">
        <h1 class="text-3xl md:text-6xl font-montserrat">20 YEARS</h1>
        <h2 class="text-lg md:text-4xl font-montserrat">IN PROFESSIONAL HAIR SERVICES</h2>
      </div>
      <div class="mt-5 flex flex-col sm:flex-row justify-center items-center">
        <RouterLink to="/services">
          <button
            class="border-[2px] border-brown m-3 p-2 rounded-2xl bg-brown text-white cursor-pointer hover:scale-125"
          >
            View services
          </button>
        </RouterLink>
        <RouterLink to="/auth/login-booking">
          <button
            class="border-[2px] border-brown m-3 p-2 rounded-2xl bg-brown text-white cursor-pointer hover:scale-125"
          >
            Book Appointment now
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
