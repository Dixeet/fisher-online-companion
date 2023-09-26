import { createApp } from 'vue';
import App from './App.vue';
import vuetify from '~/plugins/vuetify.js';
import dexie from '~/plugins/dexie.js';

createApp(App).use(vuetify).use(dexie).mount('#app');
