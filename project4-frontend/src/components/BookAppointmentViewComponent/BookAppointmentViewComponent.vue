<script setup>
// IMPORTS
import { reactive, watch, computed } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import * as appointmentService from '../../services/appointmentService';
import emailjs from "@emailjs/browser";

// CONSTANTS
const SERVICE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const TEMPLATE_ID = import.meta.env.VITE_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const date = new Date();
const today = formatDateISO(date)
const toast = useToast();
const router = useRouter();
const token = localStorage.getItem('token');
const openingHours = [
    '1030',
    '1100',
    '1130',
    '1200',
    '1230',
    '1300',
    '1330',
    '1400',
    '1430',
    '1500',
    '1530',
    '1600',
]
const state = reactive({
    bookedTiming: [],
    
})
// Use computed to track available slots
// const availableSlots = computed(() => {
//   // Extract times from bookedTiming and filter them out from openingHours
//   const bookedTimes = state.bookedTiming.map(booking => booking.time);
//   return openingHours.filter(slot => !bookedTimes.includes(slot));
// });
const availableSlots = computed(() => {
  const selectedService = services.find(s => s.name === formData.service);
  if (!selectedService) {
    return [];
  }
  const duration = selectedService.duration;
  const slotInterval = 30;

  const available = [];
  for (let i = 0; i <= openingHours.length - (duration / slotInterval); i++) {
    const combinedSlots = [];
    for (let j = 0; j < duration / slotInterval; j++) {
      combinedSlots.push(openingHours[i + j]);
    }

    const allSlotsAvailable = combinedSlots.every(slot => {
      const isSlotAvailable = !state.bookedTiming.some(booking => {
        // Convert both dates to ISO date strings for comparison
        const bookingDate = new Date(booking.date).toISOString().split('T')[0];
        const formDate = new Date(formData.date).toISOString().split('T')[0];

        return bookingDate === formDate && booking.time.includes(slot);
      });
      console.log(
        'Checking slot:',
        slot,
        'Combined slots',
        combinedSlots,
        'is available:',
        isSlotAvailable
      );
      return isSlotAvailable;
    });

    if (allSlotsAvailable) {
      available.push(openingHours[i]);
    }
  }
  console.log('Available slots:', available);
  return available;
});

let bookedTimeSlot=[]

// VARIABLE
// STATES
const services = [
  { name: "cut", duration: 30 },
  { name: "color", duration: 60 },
  { name: "treatment", duration: 90 },
];
const formData = reactive({
    fullName:"",
    mobileNumber:'',
    email:'',
    service: 'cut', //set a default service
    date: Date,
    time:[],
    comments:'',
    status: "pending"
})


// watch method is used to run a callback when a reactive state changes, similar to useEffect dependencies
watch(() => formData.date, (newDate, oldDate) => {
    // Only run checkAppointments when the date changes
    if (newDate !== oldDate) {
        state.bookedTiming = []; // Reset the booked timings
        bookedTimeSlot=[]
        console.log('Date changed: ', newDate);
        checkAppointments(newDate); // Trigger the appointment check for the new date
    }
});

watch(state,()=>{
    if (state.bookedTiming.length !== bookedTimeSlot.length) {
        for (let i=0; i<state.bookedTiming.length; i++) {
    bookedTimeSlot.push(state.bookedTiming[i].time)
 }
    }
 
 console.log('appointment timings: ',bookedTimeSlot)

})
// FUNCTION
function formatDateISO(date){
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
};
function calculateEndTime(startTime, serviceName) {
  const selectedService = services.find(s => s.name === serviceName);
  const duration = selectedService.duration;
  const startHours = parseInt(startTime.slice(0, 2));
  const startMinutes = parseInt(startTime.slice(2));
  let totalMinutes = startHours * 60 + startMinutes + duration;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  const formattedHours = endHours.toString().padStart(2, '0');
  const formattedMinutes = endMinutes.toString().padStart(2, '0');
  return `${formattedHours}${formattedMinutes}`;
}

function updateBookedTimingsAfterBooking(formData) {
  formData.time.forEach(time => {
    state.bookedTiming.push({
      date: formData.date,
      time: time,
    });
  });
}

// Function to send email using EmailJS
async function sendConfirmationEmail(formData) {
    const templateParams = {
        fullName: formData.fullName,
        email: formData.email,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        message: 'Thank you for booking a service with us. This is a receipt of your booking. Please wait for confirmation from our barbers!'
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



async function handleSubmitAppointment() {
  if (
    !formData.fullName ||
    !formData.mobileNumber ||
    !formData.email ||
    !formData.service ||
    !formData.date ||
    !formData.time
  ) {
    toast.error('Please fill up all fields!');
  } else {
    try {
        // Populate formData.time array
      formData.time = generateTimeSlotsArray(formData.time[0]); // Use the starting time


      if (token) {
        console.log('form data: ', formData);
        const pendingAppt = await appointmentService.createAppointmentMember(formData);
        console.log(pendingAppt);
        toast.success('Appointment is booked! please wait for confirmation');
        router.push('/');
        console.log('email confirmation email to: ', formData.email);
        await sendConfirmationEmail(formData);
      } else {
        console.log('form data: ', formData);
        const pendingAppt = await appointmentService.createAppointmentGuest(formData);
        console.log(pendingAppt);
        toast.success('Appointment is booked! please wait for confirmation');
        router.push('/');
        console.log('email confirmation email to: ', formData.email);
        await sendConfirmationEmail(formData);
      }

      // Update bookedTiming after successful booking
      updateBookedTimingsAfterBooking(formData);

    } catch (error) {
      console.log('error message: ', error);
      toast.error('there was an error processing your request');
    }
  }
}
function generateTimeSlotsArray(startTime) {
  const selectedService = services.find(s => s.name === formData.service);
  const duration = selectedService.duration;
  const slotInterval = 30;
  const startIndex = openingHours.indexOf(startTime);

  if (startIndex === -1) {
    console.error('Start time not found in opening hours');
    return [];
  }

  const timeSlotsArray = [];
  for (let i = 0; i < duration / slotInterval; i++) {
    timeSlotsArray.push(openingHours[startIndex + i]);
  }
  return timeSlotsArray;
}

async function checkAppointments(date) {
  try {
    const response = await appointmentService.viewAppointmentsForADay(date);
    console.log('response: ', response);

    const flattenedBookings = response.flatMap(booking =>
      booking.time.map(time => ({ ...booking, time }))
    );

    state.bookedTiming = flattenedBookings;
    console.log('booked Timing: ', state.bookedTiming.length);
    console.log('Flattened Bookings:', state.bookedTiming); // Add this line!

  } catch (error) {
    console.log(error);
  }
}


</script>

<template>
    <div class="flex h-[800px] flex-col justify-center items-center p-2 ">
        <div class="w-[80%] max-w-[500px] bg-white p-5 shadow-2xl rounded-2xl mt-20">
            <form @submit.prevent="handleSubmitAppointment" class="flex flex-col">
            <label for="fullName">Name: </label>
            <input v-model="formData.fullName" id="fullName" name="fullName" type="text" class="bg-white border-gray-400 border-[2px] rounded-2xl px-2"></input>

            <label for="mobileNumber">Mobile Number: </label>
            <input v-model="formData.mobileNumber" id="mobileNumber" name="mobileNumber" type="tel" class="bg-white border-gray-400 border-[2px] rounded-2xl px-2"></input>

            <label for="email">Email: </label>
            <input v-model="formData.email" id="email" name="email" type="email" class="bg-white border-gray-400 border-[2px] rounded-2xl px-2"></input>

            <label for="service" >Service: </label>
            <select v-model="formData.service" id="service" name="service" class="bg-white border-gray-400 border-[2px] rounded-2xl px-2">
                <option value="cut">Cut (30 mins)</option>
                <option value="color">Color (60mins)</option>
                <option value="treatment">Treatment (90mins)</option>
            </select>

            <label for="date">Date: </label>
            <input v-model="formData.date" id="date" name="date" type="date" :min="today" class="bg-white border-gray-400 border-[2px] rounded-2xl px-2"></input>

            

            <label for="time">Time: </label>
            <select v-model="formData.time[0]" id="time" name="time" class="bg-white border-gray-400 border-[2px] rounded-2xl px-2">
             <option v-for="time in availableSlots" :key="time" :value="time">
                {{ time }} - {{ calculateEndTime(time, formData.service) }}
            </option>
            </select>

            <label for="comments">Additional Comments?</label>
            <textarea id="comments" name="comments" rows="5" v-model="formData.comments" class="bg-white border-gray-400 border-[2px] rounded-xl px-2"></textarea>

            <button type="submit" class="h-[60px] border-gray-400 border-[2px] mt-2 rounded-2xl bg-successGreen hover:bg-green-500 ">Book Appointment</button>
        </form>
        </div>
        
    </div>
</template>