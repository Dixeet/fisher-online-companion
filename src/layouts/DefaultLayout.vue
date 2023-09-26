<template>
  <v-layout>
    <v-navigation-drawer v-model="drawerLeft">
      <v-list>
        <v-list-item title="Rigs" to="/rigs"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="drawerRight" location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="1" density="compact">
      <template #prepend>
        <v-app-bar-nav-icon
          class="d-lg-none"
          density="comfortable"
          variant="text"
          @click.stop="drawerLeft = !drawerLeft"
        ></v-app-bar-nav-icon>
        <ButtonBack />
      </template>

      <v-app-bar-title class="text-body-1 text-align--center d-none d-sm-block">
        {{ title }}
      </v-app-bar-title>

      <template #append>
        <v-btn
          class="d-lg-none"
          density="comfortable"
          variant="text"
          :icon="IconToolbox"
          @click.stop="drawerRight = !drawerRight"
        />
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup>
import IconToolbox from '~icons/game-icons/toolbox';
import { useState } from '~/composables/useState.js';
import { ref } from 'vue';

const title = useState('title');
const drawerLeft = ref(true);
const drawerRight = ref(true);
</script>
