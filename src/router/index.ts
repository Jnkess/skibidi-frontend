import { createRouter, createWebHistory } from 'vue-router'
import LoginRegisterView from '../views/LoginRegisterView.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginRegister',
      component: LoginRegisterView,
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainPage.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.name === 'LoginRegister' && userStore.token) {
    next(from);
  } 
  else if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.token) {
      next({ name: 'LoginRegister' });
    } else {
      next();
    }
  } 
  else {
    next();
  }
});

export default router
