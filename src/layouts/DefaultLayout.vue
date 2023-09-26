<template>
  <v-layout>
    <v-app-bar elevation="1" density="compact">
      <v-app-bar-title>
        <router-link to="/">Fisher Online Companion</router-link>
      </v-app-bar-title>
    </v-app-bar>

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

    <v-progress-linear
      :active="active"
      indeterminate
      absolute
      color="primary"
      style="z-index: 2000"
    ></v-progress-linear>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup>
import { useState } from '~/composables/useState.js';

const active = useState('globalPending', false);
</script>
