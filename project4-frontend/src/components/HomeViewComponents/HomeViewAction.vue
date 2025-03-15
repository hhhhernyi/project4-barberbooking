<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex md:flex-row sm:flex-col-reverse w-full h-[800px] justify-around items-center bg-ca">
    <div>
      <div>Your Perfect Cut Awaits </div>
      <div> Experience the Best in Grooming!</div>
      <div><RouterLink to="/auth/login-booking"><button class="text-white p-3 bg-darkBrown rounded-xl">Book Appointment Now</button></RouterLink></div>
    </div>
    <div class="h-[300px] w-[300px] border-[1px] flex justify-center items-center"><i class="pi pi-map"></i></div>
  </div>
</template>
