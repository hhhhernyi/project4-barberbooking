<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex md:flex-row sm:flex-col-reverse w-full h-[800px] justify-around items-center bg-ca">
    <div class="font-montserrat">
      <div>Your Perfect Cut Awaits </div>
      <div> Experience the Best in Grooming!</div>
      <div><RouterLink to="/auth/login-booking"><button class="text-white p-3 bg-darkBrown rounded-xl">Book Appointment Now</button></RouterLink></div>
    </div>
    <div class="h-[30%] w-[50%]flex justify-center items-center">
      <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d342.5193028505046!2d103.71682166254728!3d1.347796423835595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da0fc2cfc23853%3A0x986debd1ce02300a!2sCut-Style-Perm!5e0!3m2!1sen!2ssg!4v1742020355800!5m2!1sen!2ssg"
    height="350px"
    width="350px"
    style="border: 0"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    class="rounded-2xl"
  ></iframe>
    </div>
  </div>
</template>
