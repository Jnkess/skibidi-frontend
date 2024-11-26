<script setup>
  import "@aws-amplify/ui-vue/styles.css";

  import { Amplify } from 'aws-amplify';
  import outputs from '../../amplify_outputs.json';

  Amplify.configure(outputs);
</script>

<template v-slot="{ user, signOut }">
  <h1>Hello {{ user.username }}!</h1>
  <button @click="signOut">Sign Out</button>
</template>