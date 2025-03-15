<script setup>
const reviews = ["review 1", "review 2", "Review 3", "Review 4", "Review 5", "Review 6"];
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { RouterLink } from 'vue-router';
import * as reviewServices from '../../services/reviewsService'
import { onMounted, reactive } from 'vue';


const config = {
  height: 200,
  itemsToShow: 3,
  gap: 2,
  autoplay: 2000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};

const state = reactive({
  allReviews: []
})

onMounted(async ()=>{
  try {
      state.allReviews = await reviewServices.getReviews()
      console.log(state.allReviews)
  } catch (error) {
    console.log(error)
  }

})

function generateStars (rating) {
  return '⭐'.repeat(rating);
};

</script>

<template>
  <div class="w-full h-[400px] flex flex-col justify-center my-2 bg-mediumDarkBrown">
  <Carousel v-bind="config" >
    <Slide v-for="item in state.allReviews" :key="slide">
      <div class="carousel__item w-[200px] h-[200px] flex flex-col justify-center items-center p-3 bg-white rounded-2xl overflow-hidden border-darkBrown">
        <p>{{item.fullName}}</p> <br/>
        <p class="italic">"{{ item.review }}"</p>
        <p>{{ generateStars(item.stars)  }} </p>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
  
   </div>
   <div class="w-full flex justify-center">
    <button class="p-2 rounded-2xl bg-darkBrown text-white"><RouterLink to="/reviews/new">Leave a review now!</RouterLink></button>
   </div>
</template>
