<template>
  <v-progress-linear
    :active="active"
    indeterminate
    absolute
    color="primary"
    style="z-index: 2000"
  ></v-progress-linear>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade" mode="out-in">
        <Suspense @pending="active = true" @resolve="active = false">
          <component :is="Component"></component>
        </Suspense>
      </Transition>
    </template>
  </RouterView>
</template>

<script setup>
import { useState } from '~/composables/useState.js';

const active = useState('globalPending', false);
</script>

<style></style>
