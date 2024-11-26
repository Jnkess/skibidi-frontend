<template>
  <div class="user-settings">
    <h1>User Settings</h1>
    <h1>Hello {{ this.userStore.email }}</h1>
    <div class="tabs">
      <button @click="activeTab = 'general'">General Settings</button>
    </div>
    <div v-if="activeTab === 'general'" class="tab-content">
      <h2>Change password</h2>
      <form @submit.prevent="changePassword">
        <div>
          <label for="current-password">Current Password:</label>
          <input type="password" id="current-password" v-model="currentPassword" required>
        </div>
        <div>
          <label for="new-password">New Password:</label>
          <input type="password" id="new-password" v-model="newPassword" required>
        </div>
        <button type="submit">Change Password</button>
      </form>

      <h2>Reset password</h2>
      <form @submit.prevent="resetPassword">
        <button type="submit">Reset Password</button>
      </form>
    </div>
  </div>
</template>

<script>
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import outputs from "../../amplify_outputs.json"
import { resetPassword } from "aws-amplify/auth";
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
  methods: {
    changePassword() {
      client.queries.chgpwd({
        email: this.userStore.email,
        password: this.currentPassword,
        newPassword: this.newPassword
      });
      console.log('Password changed successfuly');
      alert('Password changed successfully!', this.userStore.email);
    },
    resetPassword() {
      client.queries.resetpwd({
        email: this.userStore.email,
      });
      console.log('Password reset email sent to', this.userStore.email);
      alert('Password reset successfull!', this.userStore.email);
    }
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
</style>
