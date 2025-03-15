<script setup>
import { reactive } from 'vue';

const formData = reactive( {
    fullName:'',
    review:'',
    stars: '',
})

function handleSubmitForm() {
    console.log(formData)
}
</script>
<template>
    <div class="w-full h-[800px] flex flex-col justify-center items-center">
        <form @submit.prevent="handleSubmitForm" class="bg-white flex flex-col justify-center items-center w-[80%] h-[400px] rounded-2xl shadow-2xl">
            <label for="fullName">Full Name: </label>
            <input id="fullName" name="fullName" v-model="formData.fullName" type="text" class="bg-white border-[2px]">

            <label for="review">Review: </label>
            <textarea id="review" name="review" v-model="formData.review" class="bg-white border-[2px]"></textarea>

            <label for="stars">Rate our service!</label>
            <input id="stars" name="stars" v-model="formData.stars" type="number" min='1' max='5' class="bg-white border-[2px]">

            <button type="submit" class="bg-brown border-brown p-2 rounded-2xl m-2 active:bg-yellow-600">Submit review!</button>
        </form>

    </div>
</template>