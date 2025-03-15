const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/appointment`;

// create a new appointment for guest
async function createAppointmentGuest(bookingFormData) {
    try {
        const res = await fetch(BASE_URL+'/guest', {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(bookingFormData),
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}

// create a new appointment for member
async function createAppointmentMember(bookingFormData) {
    try {
        const res = await fetch(BASE_URL+'/member', {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(bookingFormData),
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}

// View all pending appointments
async function viewPendingAppointments() {
    try {
        const res = await fetch(BASE_URL+'/pending', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}

// View all confirmed appointments
async function viewConfirmedAppointments() {
    try {
        const res = await fetch(BASE_URL+'/confirmed', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}
// confirm a pending appointment
async function confirmPendingAppointment(appointmentId) {
    try {
        const res = await fetch(BASE_URL+`/pending/${appointmentId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ status: "confirmed" }),
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}

// complete an appointment
async function completeAppointment(appointmentId) {
    try {
        const res = await fetch(BASE_URL+`/confirmed/${appointmentId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ status: "completed" }),
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}
// View all appointments on a certain day
async function viewAppointmentsForADay(date) {
    try {
        const res = await fetch(BASE_URL+`/checkPending/${date}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         }
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}

// View a single appointment
async function viewSingleAppointment(apptId) {
    try {
        const res = await fetch(BASE_URL+`/${apptId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         }
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}
export {
    createAppointmentGuest,
    createAppointmentMember,
    viewPendingAppointments,
    viewConfirmedAppointments,
    confirmPendingAppointment,
    viewAppointmentsForADay,
    completeAppointment,
    viewSingleAppointment
  };