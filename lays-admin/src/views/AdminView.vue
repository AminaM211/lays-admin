<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const bags = ref([])

const fetchBags = async () => {
  const res = await axios.get('http://localhost:4000/api/v1/bag')
  bags.value = res.data
}

const deleteBag = async (id) => {
  if (!confirm('Delete this bag?')) return

  await axios.delete(`http://localhost:4000/api/v1/bag/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  })

  bags.value = bags.value.filter((b) => b._id !== id)
}

onMounted(fetchBags)
</script>

<template>
  <div class="admin">
    <header class="admin-header">
      <h1>Lays Admin Panel</h1>
      <button @click="auth.logout()">Logout</button>
    </header>

    <main>
      <h2>Submitted bags</h2>

      <table class="bag-table" v-if="bags.length > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Key flavours</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="bag in bags" :key="bag._id">
            <td>{{ bag.name }}</td>
            <td>
              <span class="color-dot" :style="{ backgroundColor: bag.bagColor }"></span>
              {{ bag.bagColor }}
            </td>
            <td>{{ bag.keyFlavours?.join(', ') }}</td>
            <td>
              <button @click="deleteBag(bag._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>No bags submitted yet.</p>

    </main>
  </div>
</template>

<style>
.admin {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.bag-table {
  width: 100%;
  border-collapse: collapse;
}
.bag-table th,
.bag-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.bag-table th {
  text-align: left;
}
.color-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 6px;
  border: 1px solid #ccc;
}
button {
  padding: 6px 10px;
  cursor: pointer;
}
</style>
