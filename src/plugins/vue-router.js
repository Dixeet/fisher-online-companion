import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '~/pages/PageHome.vue';
import PageListRigs from '~/pages/Rigs/PageListRigs.vue';
import PageDetailRigs from '~/pages/Rigs/PageDetailRigs.vue';

const routes = [
  { path: '/', component: PageHome },
  { path: '/rigs', component: PageListRigs },
  { path: '/rigs/:id', component: PageDetailRigs },
];

export default createRouter({
  routes,
  history: createWebHistory(),
});
