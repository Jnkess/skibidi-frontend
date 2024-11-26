<template>
  <div class="auth-container">
    <div class="title">
      <h2>SKI</h2>
      <h1>BIDI</h1>
    </div>
    <div class="auth-cards">
      <div class="auth-card">
        <h1>Create an Account</h1>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
            <span v-if="!isEmailValid && this.email.length > 0" class="error">Invalid email format</span>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
            <span v-if="!isPasswordValid && this.password.length > 0" class="error">Password is too short, or missing one of: uppercase letter, lowercase letter or number.</span>
          </div>
          <button type="submit" :disabled="!isEmailValid || !isPasswordValid">Register</button>
        </form>
      </div>
      <div class="auth-card">
        <h1>Login</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" v-model="loginEmail" required />
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" v-model="loginPassword" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import outputs from "../../amplify_outputs.json"
import { useUserStore } from "../stores/userStore";
import { ComparisonOperator } from "@aws-sdk/client-dynamodb";

Amplify.configure(outputs);
const client = generateClient();

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      loginEmail: '',
      loginPassword: ''
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  computed: {
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    },
    isPasswordValid() {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return this.password.length >= 8 && passwordPattern.test(this.password);
    }
  },
  methods: {
    register() {
      if (this.isEmailValid) {
        try {
          client.queries.register({
            username: this.username,
            email: this.email,
            password: this.password
          });
        } catch (error) {
          console.error('Error registering user:', error);
          alert('Error registering user: ' + error.message);
        }
      }
    },
    async login () {
      try {
          const response = await client.queries.login({
            email: this.loginEmail,
            password: this.loginPassword
          });
          
          this.userStore.setEmail(this.loginEmail);
          this.userStore.setToken(response.data.slice(7, -1));
          console.log('User logged in', this.userStore.email);
          this.$router.push({ name: 'user' });
        } catch (error) {
          console.error('Error registering user:', error);
          alert('Error registering user: ' + error.message);
        }
    }
  }
};  
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

.title {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Raleway", sans-serif;
}
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('../src/assets/ site-background.jpg') no-repeat center center fixed;
  background-size: cover;
  text-align: center;
}

.auth-cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.auth-card {
  background: rgba(149, 149, 149, 0.312);
  padding: 30px;
  border: 2px solid #9c9c9c0a;
  width: 400px;
  height: 500px;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 10px 10px 40px rgb(0, 0, 0);
  backdrop-filter: blur(8px);
}

h1 {
  margin-bottom: 20px;
  font-family: "Railway", sans-serif;
  border-bottom: 1px solid #000000;
}

h2 {
  margin-bottom: 100px;
  font-size: 5rem;
  font-family: "Roboto", sans-serif;
  border-bottom: 1px solid #000000;
  border-top: 1px solid #000000;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-family: "Raleway", sans-serif;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #000000;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #919191;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: "Raleway", sans-serif;
}

button:hover:not(:disabled) {
  background-color: #b9b8b8;
}

button:hover(:disabled) {
  background-color: #b9b8b8;
}

button:disabled {
  position: relative;
}

button:disabled::after {
  content: 'Please fill out all fields correctly';
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffcccc;
  color: #ff0000;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8em;
  white-space: nowrap;
  display: none;
}

button:disabled:hover::after {
  display: block;
}

.error {
  color: red;
  font-size: 0.9em;
  font-family: "Raleway", sans-serif;
}
</style>