import { createApp } from 'vue';
import App from './App.vue';
import vuetify from '~/plugins/vuetify.js';
import dexie from '~/plugins/dexie.js';
import vueRouter from '~/plugins/vue-router.js';
import consoleVLog from '@rodrive/console-vlog';

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    /* eslint-disable-next-line no-console */
    console.clear();
  });
}

createApp(App).use(vuetify).use(dexie).use(vueRouter).use(consoleVLog).mount('#app');
