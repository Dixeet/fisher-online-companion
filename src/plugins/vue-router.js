import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '~/pages/PageHome.vue';
import PageListRigs from '~/pages/Rigs/PageListRigs.vue';
import PageDetailRigs from '~/pages/Rigs/PageDetailRigs.vue';
import { useTitle } from '@vueuse/core';
import { useState } from '~/composables/useState.js';

const mainTitle = 'Fisher Online Companion';
const routes = [
  { path: '/', component: PageHome, meta: { title: mainTitle, documentTitle: mainTitle } },
  {
    path: '/rigs',
    component: PageListRigs,
    meta: { title: 'Rigs setup', documentTitle: `Rigs Setup - ${mainTitle}` },
  },
  {
    path: '/rigs/:id',
    component: PageDetailRigs,
    meta: {
      title: (to) => `Rigs Detail ${to.params.id}`,
      documentTitle: `Rig Detail - ${mainTitle}`,
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
