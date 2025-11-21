import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),

  actions: {
    async login(email, password) {
      try {
        const res = await axios.post('http://localhost:4000/api/v1/user/auth', {
          email,
          password
        })

        this.token = res.data.token
        this.user = res.data.user

        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))

        window.location.href = '/admin'
      } catch (e) {
        alert('Wrong email or password.')
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.clear()
      window.location.href = '/login'
    }
  }
})
