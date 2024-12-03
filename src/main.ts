import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AmplifyVue from '@aws-amplify/ui-vue';
import Notifications from '@kyvg/vue3-notification'
import CoreuiVue from '@coreui/vue';
import '@coreui/coreui/dist/css/coreui.min.css';

import App from './App.vue';
import router from './router'

const app = createApp(App);
app.use(Notifications)
app.use(AmplifyVue);
app.use(createPinia());
app.use(router);
app.use (CoreuiVue)

app.mount('#app');
