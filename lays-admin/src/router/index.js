import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/admin', name: 'admin', component: AdminView }
  ]
})

// simpele guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  const goingToAdmin = to.path.startsWith('/admin')
  const goingToLogin = to.path === '/login'

  if (goingToAdmin && !token) {
    return next('/login')
  }

  if (goingToLogin && token) {
    return next('/admin')
  }

  next()
})

export default router
