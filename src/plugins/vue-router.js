import { createRouter, createWebHistory } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useState } from '~/composables/useState.js';

const mainTitle = 'Fisher Online Companion';
const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('~/pages/main.vue'),
    meta: { title: mainTitle, documentTitle: mainTitle },
  },
  {
    path: '/maps/:id/add-fishes',
    component: () => import('~/pages/maps/[id]/maps-[id]-add-fish.vue'),
    name: 'PageMapAddFishes',
    meta: { documentTitle: `Add fishes to location - ${mainTitle}`, customKey: (to) => to.path },
  },
  {
    path: '/tackles',
    component: () => import('~/pages/tackles/tackles.vue'),
    name: 'TacklesPage',
    meta: { documentTitle: `Manage tackles - ${mainTitle}`, title: 'Manage tackles' },
  },
  {
    path: '/tackles/:id',
    component: () => import('~/pages/tackles/[id]/tackles-[id].vue'),
    name: 'TackleId',
    meta: { documentTitle: `Edit tackle - ${mainTitle}`, customKey: (to) => to.path },
  },
  {
    path: '/maps/:id/:fishId/add-catch',
    component: () => import('~/pages/maps/[id]/[fishId]/maps-[id]-[fishId]-add.vue'),
    name: 'MapAddCatch',
    meta: {
      documentTitle: `Add a catch - ${mainTitle}`,
      title: 'Add a catch',
      customKey: (to) => to.path,
    },
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
