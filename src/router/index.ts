import { createRouter, createWebHistory } from 'vue-router'
import LoginRegisterView from '../views/LoginRegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginRegister',
      component: LoginRegisterView
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainPage.vue')
    }
  ]
})

export default router
