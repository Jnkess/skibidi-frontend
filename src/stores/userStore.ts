import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    setEmail(email: string) {
      this.email = email;
      localStorage.setItem('email', email);
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    clearUser() {
      this.email = '';
      this.token = '';
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    },
  },
});