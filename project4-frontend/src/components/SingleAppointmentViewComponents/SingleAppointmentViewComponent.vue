<script setup>
import { reactive, onMounted } from 'vue';
import dayjs from "dayjs";
import { useRoute, RouterLink, useRouter } from 'vue-router';
import * as appointmentService from '../../services/appointmentService'

const route = useRoute();
const appointmentId = route.params.appointmentId;
const state = reactive({
    appointment: {}
})
onMounted(async ()=>{
    try {
        state.appointment = await appointmentService.viewSingleAppointment(appointmentId)
    } catch (error) {
        console.log(error)
    }
})

</script>
<template>
    <div class="w-full h-[800px] flex flex-col justify-center items-center">
        <div class="w-[80%] max-w-[400px] flex flex-col justify-center items-center">
            <p>Date: {{ dayjs(state.appointment.date).toString().slice(0,17) }}</p>
        <p>Name: {{ state.appointment.fullName }}</p>
        <p>Contact: {{ state.appointment.mobileNumber }}</p>
        <p>Email: {{ state.appointment.email }}</p>
        <p>Service: {{ state.appointment.service }}</p>
        <p>Comments: {{ state.appointment.comments }}</p>
        </div>
        
        <RouterLink to="/admin/home"><button class="border-brown bg-brown p-2 rounded-2xl mt-5 cursor-pointer hover:bg-darkBrown text-white">Back to Dashboard</button></RouterLink>

    </div>
</template>