import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '~/pages/MainPage.vue';
import { useTitle } from '@vueuse/core';
import { useState } from '~/composables/useState.js';
import MapAddFishesPage from '~/pages/maps/[id]/MapAddFishesPage.vue';
import TacklesPage from '~/pages/tackles/TacklesPage.vue';
import TackleId from '~/pages/tackles/[id]/TackleId.vue';

const mainTitle = 'Fisher Online Companion';
const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    meta: { title: mainTitle, documentTitle: mainTitle },
  },
  {
    path: '/maps/:id/add-fishes',
    component: MapAddFishesPage,
    name: 'PageMapAddFishes',
    meta: { documentTitle: `Add fishes to location - ${mainTitle}`, customKey: (to) => to.path },
  },
  {
    path: '/tackles',
    component: TacklesPage,
    name: 'TacklesPage',
    meta: { documentTitle: `Manage tackles - ${mainTitle}`, title: 'Manage tackles' },
  },
  {
    path: '/tackles/:id',
    component: TackleId,
    name: 'TackleId',
    meta: { documentTitle: `Edit tackle - ${mainTitle}`, customKey: (to) => to.path },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior,
});

router.afterEach((to, from) => {
  if (to.meta?.documentTitle) {
    if (typeof to.meta.documentTitle === 'function') {
      useTitle(to.meta.documentTitle(to, from));
    } else {
      useTitle(to.meta.documentTitle);
    }
  }
  if (to.meta?.title) {
    const title = useState('title');
    if (typeof to.meta.title === 'function') {
      title.value = to.meta.title(to, from);
    } else {
      title.value = to.meta.title;
    }
  }
});

router.beforeEach((to) => {
  if (to.meta?.customKey) {
    to.meta.routerKey = to.meta.customKey(to);
  }
});

function scrollBehavior(to, from, savedPosition) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (savedPosition) {
        resolve({ ...savedPosition, behavior: 'smooth' });
      } else {
        resolve({ top: 0, behavior: 'smooth' });
      }
    }, 500);
  });
}

export default router;
