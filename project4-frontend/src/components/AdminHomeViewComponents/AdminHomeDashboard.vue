<script setup>
// IMPORT
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import * as appointmentService from "../../services/appointmentService";
import * as userService from '../../services/user'
import { useToast } from "vue-toastification";
import dayjs from "dayjs";
import emailjs from "@emailjs/browser";
dayjs().format()
// CONSTANTS
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const pendingAppointment = ref([]);
const confirmedAppointment = ref([])
const toast = useToast();
const today = new Date()
// VARIABLES
// STATES
onMounted(async ()=>{
    const token = localStorage.getItem('token')
    const decoded = JSON.parse(atob(token.split('.')[1]));
    console.log(decoded.payload.admin) // i can check for admin status here
  try {
    const confirmApptsResponse = await appointmentService.viewConfirmedAppointments();
    const pendingApptsResponse = await appointmentService.viewPendingAppointments();
    pendingAppointment.value = pendingApptsResponse;
    confirmedAppointment.value = confirmApptsResponse;
    console.log(pendingAppointment)
    console.log(confirmedAppointment)

  } catch (error) {
    console.log(error)

  }
})
// FUNCTIONS
async function confirmAppt(itemID, fullName, email, service, date, time) {
    console.log('appointment confirmed for: ', itemID)
    console.log('Email sent to: ', email)
    try {
      const updatedAppoinmentStatus = await appointmentService.confirmPendingAppointment(itemID)
      console.log("updated: ", updatedAppoinmentStatus)
      confirmedAppointment.value = await appointmentService.viewConfirmedAppointments();
      pendingAppointment.value = await appointmentService.viewPendingAppointments();
      const emailResponse = await sendConfirmationEmail(fullName, email, service, date, time);
      console.log('email response: ', emailResponse)
      toast.success('Appointment confirmed')

    } catch (error) {
      console.log(error)
    }
}
async function cancelAppt(itemID, fullName, email, service, date, time) {
    console.log('appointment confirmed for: ', itemID)
    console.log('Email sent to: ', email)
    try {
      const updatedAppoinmentStatus = await appointmentService.confirmPendingAppointment(itemID)
      console.log("updated: ", updatedAppoinmentStatus)
      confirmedAppointment.value = await appointmentService.viewConfirmedAppointments();
      pendingAppointment.value = await appointmentService.viewPendingAppointments();
      const emailResponse = await sendConfirmationEmail(fullName, email, service, date, time);
      console.log('email response: ', emailResponse)
      toast.success('Appointment confirmed')

    } catch (error) {
      console.log(error)
    }
}
async function getCustomerDetails(customerID) {
  try {
    const customerData = await userService.viewSingleUser(customerID)
    return customerData
  } catch (error) {
    console.log(error)
  }
}

async function completeAppt(itemID,service, customer) {
  let addedPoints=0
  console.log("appointment completed: ",itemID)
  // check if the customer is logged in or not
if (customer ) {
  // get the customer points
  let customerDetails = await getCustomerDetails(customer)
  let customerPoints = customerDetails.points
  console.log('customerpoints: ', customerPoints)
  if (service === 'cut') {
    addedPoints=7
  } else if (service==='color') {
    addedPoints=30
  } else if (service === 'perm') {
    addedPoints = 50
  } else if (service === 'treatment') {
    addedPoints = 100
  }
  console.log(`${addedPoints} points added to:` , customer)
  let newPoints = customerPoints+ addedPoints
  let updateData = {"points": newPoints}
  let updatedCustomerDetails = await userService.updateUser(customer, updateData)
  console.log(updatedCustomerDetails)
  console.log(`customer now has ${newPoints} points`)
}

  const completedAppointment = await appointmentService.completeAppointment(itemID)
  console.log('completedAppointment: ', completedAppointment)
  confirmedAppointment.value = await appointmentService.viewConfirmedAppointments();
  pendingAppointment.value = await appointmentService.viewPendingAppointments();
  toast.success('Appointment completed!')
  // i need to have a service to update the status of the appointment with itemID form confirmd to completed
}

async function sendConfirmationEmail(fullName, email, service, date, time) {
    const templateParams = {
        fullName: fullName,
        email: email,
        service: service,
        date: date.slice(0,10),
        time: time,
        message: 'Your Appointment has been confirmed!'
    };
    console.log('templateParams: ', templateParams)

    try {
        const result = await emailjs.send(
            "service_77il0n9",
            "template_k96zlsx",
            templateParams,
            PUBLIC_KEY
        );
        console.log('Email sent successfully', result);
        toast.success('Confirmation email sent!');
    } catch (error) {
        console.log('Error sending email:', error);
        toast.error('There was an error sending the confirmation email.');
    }
}




</script>
<template>
  <div class="w-full md:h-[800px] sm:h-[1200px] flex flex-col items-center">
    <div class="mt-[140px]">Today's Date: 
      <p class="font-special text-3xl">{{  dayjs(today).toString().slice(0,17)}}</p>
      
    </div>
    <div class="flex mt-[50px] sm:flex-col md:flex-row space-around justify-center items-center">
      <!-- display all pending appointments here -->
      <div class="border-[2px] m-2 sm:w-[80%] sm:h-[400px] md:w-[40vw] md:h-[500px] p-2 bg-brown rounded-xl">
        <h2 class="mx-auto text-center text-2xl underline font-poppins">Pending Appointments</h2>
        <section class="flex border-[2px] border-darkBrown bg-darkBrown text-white px-2">
        <p class="w-[80px]">Name: </p>
        <p class="w-[100px]">Service: </p>
        <p class="w-[150px]">Date and time:</p>
        </section>
        <div class="md:h-[410px] sm:h-[310px] overflow-auto border-[2px] rounded-2xl my-2 p-2">
          <ul>
            <li v-for="item in pendingAppointment" class="flex flex-col justify-items-end">
              <div class="flex items-center my-2">
                <p class="w-[80px] px-2">{{ item.fullName }}</p> <p class="w-[100px] px-2">{{ item.service }}</p><div class="flex flex-col w-[150px]"><p>{{ dayjs(item.date).toString().slice(0,17) }}</p> <p>{{ item.time[0] }}</p> </div>
              </div>
              <div>
                <button @click="confirmAppt(item._id, item.fullName, item.email, item.service, item.date, item.time)"  class=" w-[30%] border-[2px] p-2 rounded-2xl bg-successGreen hover:cursor-pointer mx-1">Confirm</button>
                <button @click="cancelAppt(item._id, item.fullName, item.email, item.service, item.date, item.time)"  class=" w-[30%] border-[2px] p-2 rounded-2xl bg-red hover:cursor-pointer mx-1">Cancel</button>
                <RouterLink :to="'/appointments/' + item._id" ><button  class=" w-[30%] border-[2px] p-2 rounded-2xl bg-lightBrown hover:cursor-pointer mx-1">View</button></RouterLink>
              </div>
              
              </li>
        </ul>
        </div>
        
        

      </div>

      <!-- display all confirmed appointments here -->
      <div class="border-[2px] m-2 sm:w-[80%] sm:h-[400px] md:w-[40vw] md:h-[500px] p-2 bg-brown rounded-xl">
        <h2 class="mx-auto text-center text-2xl underline font-poppins">Confirmed Appointments</h2>
        <section class="flex border-[2px] border-darkBrown bg-darkBrown text-white px-2">
        <p class="w-[80px]">Name: </p>
        <p class="w-[100px]">Service: </p>
        <p class="w-[150px]">Date and time:</p>
        </section>
        <div class="md:h-[410px] sm:h-[310px] overflow-auto border-[2px] rounded-2xl my-2 p-2">
          <ul>
            <li v-for="item in confirmedAppointment" class="flex flex-col justify-items-end">
              <div class="flex items-center my-2">
                <p class="w-[80px] px-2">{{ item.fullName }}</p> <p class="w-[100px] px-2">{{ item.service }}</p><div class="flex flex-col w-[150px]"><p>{{ dayjs(item.date).toString().slice(0,17) }}</p> <p>{{ item.time[0] }}</p> </div>
              </div>
              <div>
                <button @click="completeAppt(item._id,item.service, item.customer)"  class=" w-full border-[2px] p-2 rounded-2xl bg-white hover:cursor-pointer">Completed ?</button>
              </div>
              
              
              </li>
        </ul>
        </div>
        
        

      </div>
     
    </div>
  </div>
</template>
