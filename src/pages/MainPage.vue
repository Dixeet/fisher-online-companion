<template>
  <div>
    <h3 class="mb-1">Fishes Catch</h3>
    <v-divider class="mb-2" />
    <div class="d-flex flex-wrap">
      <v-btn :prepend-icon="IconPlus" to="/maps/current/add-fishes">Add Fishes To Lake</v-btn>
    </div>
  </div>
</template>

<script setup>
import IconPlus from '~icons/mdi/plus';
</script>
<style></style>
