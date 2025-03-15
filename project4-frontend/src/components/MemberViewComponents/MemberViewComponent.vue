<script setup>
const token = localStorage.getItem('token');
const decoded = JSON.parse(atob(token.split('.')[1]));
const userId = decoded.payload._id
console.log(decoded.payload.admin)
import { onMounted, reactive, ref } from 'vue';
import * as userService from '../../services/user'
// IMPORTS
// CONSTANTS
const state = reactive({
    userDetail: {}
})
// VARIABLES
// STATE
onMounted(async ()=>{
    try { 
        const response = await userService.viewSingleUser(userId)
      state.userDetail = response
      console.log(state.userDetail)

    } catch (error) {
        console.log(error)

    }
})
// FUNCTION

</script>

<template>
    <div v-if="token" class="w-full h-[800px] flex flex-col items-center justify-center">
        <h1>Member Info</h1>
        <p>Email: {{ state.userDetail.email }}</p>
        <p>Contact: {{ state.userDetail.mobileNumber }}</p>
        <p>Points: {{ state.userDetail.points }}</p>
       <p>Member Since: {{ state.userDetail.createdAt }}</p>
        
    </div>

    <div v-else-if="!token">
        <p>members who are not logged in are not authorised</p>
    </div>
</template>