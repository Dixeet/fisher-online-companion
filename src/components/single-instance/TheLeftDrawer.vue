<template>
  <v-navigation-drawer v-model="open">
    <v-list>
      <v-list-item title="Main" to="/"></v-list-item>
      <v-list-item title="Fishes add" to="/maps/current/add-fishes"></v-list-item>
      <v-list-item title="Fishes 2" to="/maps/2/add-fishes"></v-list-item>
    </v-list>
    <template #append>
      <TheDatabaseManager />
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useVModel } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update:modelValue']);
const open = useVModel(props, 'modelValue', emit);
</script>

<style></style>
