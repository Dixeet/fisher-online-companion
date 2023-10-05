<template>
  <v-progress-linear
    :active="active"
    indeterminate
    absolute
    color="primary"
    style="z-index: 2000"
  ></v-progress-linear>
  <RouterView :key="$route.meta?.routerKey" v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </template>
  </RouterView>
</template>

<script setup>
import { useState } from '~/composables/useState.js';

const active = useState('globalPending', false);
</script>

<style></style>
