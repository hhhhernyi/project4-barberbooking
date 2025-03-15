<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
<div class="w-full my-2 flex sm:flex-col items-center xl:h-[800px] justify-center">
    <div class="flex flex-col items-center text-m md:text-2xl md:flex-row md:mx-10 my-5 animate-fade-up animate-once animate-duration-[900ms] animate-delay-200 animate-ease-out">
        <div class="mx-5 text-darkBrown">SERVICES PROVIDED AT</div>
        <div class="flex bg-black w-auto justify-center p-1 rounded-2xl  ">
            <p class="text-red m-1">CUT </p>
            <p class="text-white m-1">. </p>
            <p class="text-yellow m-1">STYLE </p>
            <p class="text-white m-1">. </p>
            <p class="text-blue m-1">PERM</p>
        </div>
    </div>
    <div class="flex flex-col lg:flex-row items-center justify-around p-2 my-5">
        <div class="flex flex-col md:w-[25%] md:h-[400px] sm:w-[80%] m-2  items-center">
            
                <img src="../../assets/images/homeServiceCutImage.jpg" alt="cutting hair" class="rounded-3xl w-[300px] h-[200px] object-cover"/>
            
            <div class="flex flex-col items-center">
                <div class="text-3xl">Cut</div>
                <div class="text-sm lg:w-[65%] md:w-[full] font-poppins">Freshen up your look with a precision haircut tailored to suit your personal style. Whether you're going for a classic cut or something modern, our expert barbers take the time to craft a haircut that complements your features and leaves you feeling sharp and confident. From fades to buzz cuts, we’ve got you covered!</div>
            </div>
        </div>

        <div class="flex flex-col md:w-[25%] md:h-[400px] sm:w-[80%] m-2  items-center">
           
                <img src="../../assets/images/homeServiceColorImage.jpg" alt="Coloring hair" class="rounded-3xl w-[300px] h-[200px] object-cover"/>
            
            <div class="flex flex-col items-center">
                <div class="text-3xl">Color</div>
                <div class="text-sm lg:w-[65%] md:w-[full] font-poppins">Add some color to your life with a hair coloring service designed just for you. Whether you're looking to brighten up your natural shade, go bold with a new hue, or add some highlights for dimension, our color experts will create a look that enhances your style and gives you that refreshed, vibrant appearance.</div>
            </div>
        </div>

        <div class="flex flex-col md:w-[25%] md:h-[400px] sm:w-[80%] m-2  items-center">
            
                <img src="../../assets/images/homeServicePermImage.jpeg" alt="perm hair" class="rounded-3xl w-[300px] h-[200px] object-cover"/>
            
            <div class="flex flex-col items-center">
                <div class="text-3xl">Perm</div>
                <div class="text-sm lg:w-[65%] md:w-[full] font-poppins">Get those gorgeous curls or waves with our perming service! If you're looking to add volume, texture, or curl to your hair, our stylists use advanced perming techniques to create lasting results.We’ll work with you to achieve the perfect look that’s full of life and movement.</div>
            </div>
        </div>

        <div class="flex flex-col md:w-[25%] md:h-[400px] sm:w-[80%] m-2  items-center">
            
                <img src="../../assets/images/homeServiceTreatmentImage.png" alt="treat hair" class="rounded-3xl w-[300px] h-[200px] object-fill"/>
           
            <div class="flex flex-col items-center">
                <div class="text-3xl">Treatment</div>
                <div class="text-sm lg:w-[65%] md:w-[full] font-poppins">Nourish and rejuvenate your hair with a luxurious hair treatment. From deep conditioning to restoring shine and softness, our treatments are designed to  revitalize your hair, leaving it healthier and more manageable. Perfect for dry, damaged, or color-treated hair.</div>
            </div>
        </div>

        

    </div>
    <div>
        <RouterLink to="/services"><button class="p-3 bg-darkBrown cursor-pointer animate-bounce hover:bg-amber-700 rounded-3xl text-white">View all our services now!</button></RouterLink>
    </div>
</div>
</template>
