<template>
  <v-layout>
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Rigs" to="/rigs"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="1" density="compact">
      <template #prepend>
        <ButtonBack />
      </template>
      <v-app-bar-title class="text-body-1">
        {{ title }}
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup>
import { useState } from '~/composables/useState.js';

const title = useState('title');
</script>
