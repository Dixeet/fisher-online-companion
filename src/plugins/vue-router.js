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
    path: '/database-manager',
    component: () => import('~/pages/database-manager.vue'),
    name: 'DatabaseManager',
    meta: {
      documentTitle: `Database Manager - ${mainTitle}`,
      title: 'Database Manager',
    },
  },
  {
    path: '/help',
    component: () => import('~/pages/help.vue'),
    name: 'Help',
    meta: {
      documentTitle: `Help - ${mainTitle}`,
      title: 'Help',
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
