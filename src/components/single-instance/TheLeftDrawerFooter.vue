<template>
  <div class="d-flex pa-1 align-center justify-space-between">
    <v-btn
      rounded="0"
      :active="false"
      density="comfortable"
      variant="text"
      icon
      :to="{ name: 'DatabaseManager' }"
    >
      <v-icon>
        <i-mdi-database-edit></i-mdi-database-edit>
      </v-icon>
    </v-btn>
    <a
      class="mx-2"
      target="_blank"
      href="https://store.steampowered.com/app/1094780/Fisher_Online/"
    >
      Fisher Online™ Game
    </a>
    <v-btn rounded="0" :active="false" density="comfortable" variant="text" icon to="/help">
      <v-icon size="small">
        <i-mdi-help-circle></i-mdi-help-circle>
      </v-icon>
    </v-btn>
  </div>
</template>

<script setup></script>

<style></style>
