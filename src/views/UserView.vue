<template>
  <div class="user-settings">
    <h2>Settings:</h2>
    <h1>{{ this.userStore.email }}</h1>
    <div class="auth-cards">
      <div class="auth-card">
        <h2>Change Password</h2>
        <form @submit.prevent="changePassword">
          <div>
            <label for="current-password">Current Password:</label>
            <input type="password" id="current-password" v-model="currentPassword" required>
          </div>
          <div>
            <label for="new-password">New Password:</label>
            <input type="password" id="new-password" v-model="newPassword" required>
          </div>
          <CButton type="submit" color="primary" shape="rounded-0" variant="outline" disabled>Change Password</CButton>
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

export default {
  data() {
    return {
      activeTab: 'general',
      currentPassword: '',
      newPassword: ''
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  computed: {
    isPasswordValid() {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,20}$/;
      return this.password.length >= 8 && passwordPattern.test(this.password);
    },
    arePasswordsIdentical() {
      return this.newPassword === this.newPasswordConfirm;
    },
    disabled() {
      return this.arePasswordsIdentical || !this.isPasswordValid;
    }
  },
  methods: {
    async changePassword() {
      const response = await client.queries.chgpwd({
        email: this.userStore.email,
        password: this.currentPassword,
        newPassword: this.newPassword,
        token: this.userStore.token
      });
      console.log('Password changed successfuly');
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
</style>
