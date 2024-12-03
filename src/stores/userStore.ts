import { defineStore } from 'pinia';
import { Amplify } from "aws-amplify"
import { generateClient, Client } from "aws-amplify/api"
import outputs from "../../amplify_outputs.json"

export const useUserStore = defineStore('user', {
  state: () => ({
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    userId: localStorage.getItem('userId') || '',
    resetCode: localStorage.getItem('resetCode') || '',
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
    setResetCode(resetCode: string) {
      this.resetCode = resetCode;
      localStorage.setItem('resetCode', resetCode);
    },
    clearUser() {
      this.email = '';
      this.token = '';
      this.username = '';
      this.userId = '';
      this.resetCode = '';
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      localStorage.removeItem('resetCode');
    },
    async validateToken() {
      Amplify.configure(outputs);
      const client = generateClient() as any;
      if (!this.token) {
        return false;
      }
      try {
        const response = await client.queries.checkToken({
          token: this.token,
        });
        if (response.data) {
          true;
        }
        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});