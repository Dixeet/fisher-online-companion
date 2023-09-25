<template>
  <v-layout>
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Fisher Online Companion"></v-app-bar>

    <v-main>
      <v-container><slot /></v-container>
    </v-main>
  </v-layout>
</template>
