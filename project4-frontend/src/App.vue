<script setup>
import NavBar from './components/NavBar/NavBar.vue';
import { RouterView } from 'vue-router';
import Footer from './components/Footer/Footer.vue';

</script>

<template>
   <NavBar :key="$route.fullPath"/> <!--found this method on google search to re render a component on click, need to further understrand it-->
  <RouterView />
  <Footer />
</template>