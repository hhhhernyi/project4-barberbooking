<script setup>
const token = localStorage.getItem('token');
const decoded = JSON.parse(atob(token.split('.')[1]));
const isAdmin = decoded.payload.admin
console.log(decoded.payload.admin)
</script>

<template>
    <h1>member page to see their details</h1>
    <div v-if="token">
        <p>members who are logged in can see this</p>
    </div>

    <div v-else>
        <p>members who are not logged in are not authorised</p>
    </div>
</template>