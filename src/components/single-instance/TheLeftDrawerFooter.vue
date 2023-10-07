<template>
  <div class="d-flex pa-1">
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
  </div>
</template>

<script setup></script>

<style></style>
