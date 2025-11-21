<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const bags = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:4000/api/v1/bag')
  bags.value = res.data
})
</script>

<template>
  <div>
    <h1>Admin Panel</h1>
    <button @click="auth.logout()">Logout</button>

    <h2>All Submitted Bags</h2>

    <div v-for="bag in bags" :key="bag._id">
      <p><b>{{ bag.name }}</b></p>
    </div>
  </div>
</template>
