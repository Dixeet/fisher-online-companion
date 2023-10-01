<template>
  <v-layout>
    <TheLeftDrawer
      v-model="drawerLeft"
      :class="{ 'd-none': drawerLeft === undefined }"
      class="d-lg-flex"
    />

    <v-app-bar elevation="1" density="compact">
      <template #prepend>
        <v-btn size="large" :active="false" density="compact" :icon="IconFishing" to="/" />
      </template>

      <v-app-bar-title :class="classObj" class="text-body-1 text-align--center">
        <h1 class="text-body-1">{{ title }}</h1>
      </v-app-bar-title>

      <template #append>
        <ButtonBack />
      </template>
    </v-app-bar>

    <v-btn
      class="d-lg-none drawer__open"
      variant="tonal"
      :icon="IconToolbox"
      @click.stop="drawerLeft = !drawerLeft"
    />

    <v-main>
      <v-container :class="classObj">
        <slot />
      </v-container>
      <v-snackbar v-model="snackbar" :color="snackbarColor" location="top right">
        {{ snackbarText }}
        <template #actions>
          <v-btn icon @click="snackbar = false">
            <v-icon> <i-mdi-close></i-mdi-close> </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-layout>
</template>
<script setup>
import IconToolbox from '~icons/game-icons/toolbox';
import IconFishing from '~icons/game-icons/boat-fishing';
import { useState } from '~/composables/useState.js';
import { computed, ref, watch } from 'vue';
import { getNotifyRefs } from '~/composables/useNotify.js';

const title = useState('title');
const drawerLeft = ref(undefined);
const animate = ref(false);
const { snackbar, snackbarText, snackbarColor } = getNotifyRefs();

const classObj = computed(() => ({
  'fade-enter-from': animate.value,
  'fade-enter-active': !animate.value,
}));

watch(title, () => {
  animate.value = true;
  setTimeout(() => (animate.value = false));
});
</script>
<style lang="scss">
.v-toolbar__content {
  > .v-toolbar-title {
    margin-inline-end: 16px;
    h1 {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.drawer__open {
  position: fixed;
  left: 8px;
  bottom: 8px;
  z-index: 9;
}
</style>
