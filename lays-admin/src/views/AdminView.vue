<script setup>
import { useAuthStore } from '../stores/auth'
import { ref, onMounted } from 'vue'
import axios from 'axios'

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

    <h2>Submitted Bags</h2>

    <div v-for="bag in bags" :key="bag._id">
      <p><strong>{{ bag.name }}</strong></p>
      <button @click="deleteBag(bag._id)">Delete</button>
    </div>
  </div>
</template>
