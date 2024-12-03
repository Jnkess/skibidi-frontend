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
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainPage.vue'),
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      component: () => import('../views/ResetPwdView.vue'),
    },
    {
      path: '/resetPwd2',
      name: 'resetPwd2',
      component: () => import('../views/ResetPwdView2.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.name === 'resetPwd') {
    next();
  }
  else if (to.name === 'resetPwd2') {
    if(!to.query.key) {
      next({ name: 'LoginRegister' });
    }
    const queryKey = to.query.key;
    userStore.setResetCode(queryKey as string);
    next();
  }
  else if (to.name === 'LoginRegister') {
    if (userStore.token) {
      const validateTokenResponse = userStore.validateToken();
      if (!validateTokenResponse) {
        userStore.clearUser();
        next({ name: 'LoginRegister' });
        throw new Error('Invalid token');
      }
      else {
        next({ name: 'user' });
      }
    }
    else {
      next();
    }
  }
  else if (userStore.token) {
    const validateTokenResponse = userStore.validateToken();
    if (!validateTokenResponse) {
      userStore.clearUser();
      next({ name: 'LoginRegister' });
      throw new Error('Invalid token');
    }
    else {
      if (to.name === 'LoginRegister') {
        next(from);
      } 
      else {
        next();
      }
    } 
  }
  else {
    console.log("no token");
    next({ name: 'LoginRegister' });
  }
});

export default router
