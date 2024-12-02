import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    userId: localStorage.getItem('userId') || '',
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
    setUsername(username: string) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    setUserId(userId: string) {
      this.userId = userId;
      localStorage.setItem('userId', userId);
    },
    clearUser() {
      this.email = '';
      this.token = '';
      this.username = '';
      this.userId = '';
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    },
  },
});