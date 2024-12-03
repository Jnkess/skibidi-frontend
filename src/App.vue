<template>
  <div id="app">
    <CNavbar expand="lg" color-scheme="light" class="bg-light" v-if="isUserLoggedIn">
      <CContainer fluid>
        <CNavbarToggler aria-label="Toggle navigation" aria-expanded={visible} @click="visible = !visible"/>
        <CCollapse class="navbar-collapse" :visible="visible">
          <CNavbarNav>
            <CNavItem>
              <CNavLink href="#" active>
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">User Settings</CNavLink>
            </CNavItem>
          </CNavbarNav>
          <CForm class="fl-left">
            <CButton color="primary" shape="rounded-0" variant="outline" @click="logout">Logout</CButton>
          </CForm>
        </CCollapse>
      </CContainer>
    </CNavbar>
  <router-view/>
  <notifications position="bottom right" width="600" duration=5 max=5 />
  </div>
</template>

<script>
import { useUserStore } from "./stores/userStore";
import '@coreui/coreui/dist/css/coreui.min.css';
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import outputs from "../amplify_outputs.json"

Amplify.configure(outputs);
const client = generateClient();

export default {
  name: 'App',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  computed: {
    isUserLoggedIn() {
      if (this.userStore.token) {
        return true;
      } 
      else {
        return false;
      }
    },
  },
  methods: {
    async logout() {
      const response = await client.queries.logout({
        userId: this.userStore.userId,
        token: this.userStore.token,
      });
      console.log('Logout successful');
      console.log(response);
      this.userStore.clearUser();
      this.$router.push('/');
    },
  }
}

</script>

<style>

nav {
  display: flex;
  gap: 10px;
}
.fl-left {
  margin-left: auto;
}
</style>