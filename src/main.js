import { createApp } from 'vue';
import App from './App.vue';
import vuetify from '~/plugins/vuetify.js';
import dexie from '~/plugins/dexie.js';
import vueRouter from '~/plugins/vue-router.js';

createApp(App).use(vuetify).use(dexie).use(vueRouter).mount('#app');
