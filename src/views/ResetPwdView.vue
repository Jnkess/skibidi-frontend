<template>
  <div class="user-settings">
    <h2>Settings:</h2>
    <h1>{{ this.userStore.email }}</h1>
    <div class="auth-cards">
      <div class="auth-card">
        <h2>Send verification email</h2>
        <form @submit.prevent="resetPassword">
          <div>
            <label for="new-password">Email:</label>
            <input type="text" id="email" v-model="email" required>
            {{ test }}
          </div>
          <button type="submit" :disabled="!isEmailValid">Send</button>
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

Amplify.configure(outputs);
const client = generateClient();
console.log(import.meta.env.VITE_AMPLIFY_emailUser);

export default {
  data() {
    return {
      email: '',
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  computed: {
    url(){
      return window.location.origin.toString();
    },
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    },
    test() {
      return process.env.AMPLIFY_emailUser;
    }
  },
  methods: {
    async resetPassword() {
      const response = await client.queries.resetpwd({
        email: this.email,
        baseUrl: this.url,
      });
      notify({
        type: 'success',
        title: `Success`,
        text: `Verification email sent to ${this.email}`,
      });
      console.log('Password reset email sent to', this.userStore.email);
      console.log(response);
    },
  }
};
</script>

<style>
.user-settings {
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-content {
  border: 1px solid #ccc;
  padding: 20px;
}

@media (min-width: 1024px) {
  .user-settings {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

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
  background: none;
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
  font-size: 1.5rem;
  font-family: "Railway", sans-serif;
}

h2 {
  font-size: 2rem;
  font-weight: 900;
  font-family: "Roboto", sans-serif;
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
  margin-bottom: 20px;
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
</style>
