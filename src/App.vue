<template>
  <div class="auth-container">
    <div class="title">
      <h2>SKIBIDI</h2>
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
          <button type="submit" :disabled="!isEmailValid || !areAllFieldsFilled || !isPasswordValid">Register</button>
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
  computed: {
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    },
    areAllFieldsFilled() {
      return this.username && this.email && this.password;
    },
    isPasswordValid() {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return this.password.length >= 8 && passwordPattern.test(this.password);
    }
  },
  methods: {
    register() {
      if (this.isEmailValid) {
        // Handle registration logic here
        console.log('User registered:', this.username, this.email, this.password);
      } else {
        console.log('Invalid email format');
      }
    },
    login() {
      // Handle login logic here
      console.log('User logged in:', this.loginEmail, this.loginPassword);
    }
  }
};
</script>

<style scoped>
.title {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(91, 255, 69);
}

.auth-container {
  display: flex;
  flex-direction: column; /* Change to column layout */
  justify-content: center; /* Center the content vertically */
  align-items: center; /* Center the content horizontally */
  height: 100vh; /* Adjust height to 100vh */
  background: linear-gradient(135deg, #0f0f0f, #3b3b3b);
}

.auth-cards {
  display: flex;
  flex-direction: row; /* Keep auth-card elements next to each other */
  justify-content: center;
  align-items: center;
  gap: 20px; /* Add space between the cards */
}

.auth-card {
  background: linear-gradient(135deg, #0f0f0f, #3b3b3b);
  padding: 30px;
  border-radius: 10px;
  border: 1px solid rgb(91, 255, 69);
  width: 400px;
  height: 500px;
  text-align: center;
  box-sizing: border-box;
}

h1 {
  margin-bottom: 20px;
  color: rgb(91, 255, 69);
}

h2 {
  margin-bottom: 100px;
  color: rgb(91, 255, 69);
  font-size: 5rem;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: rgb(91, 255, 69);
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #333;
  color: white;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #222222;
  color: rgb(133, 255, 12);
  border: 1px solid rgb(133, 255, 12);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #5d5d5d;
  border: 1px dotted rgb(133, 255, 12);
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #28432d;
}

.error {
  color: red;
  font-size: 0.9em;
}
</style>