<template>
  <v-navigation-drawer v-model="open">
    <v-list>
      <v-list-item title="Rigs" to="/rigs"></v-list-item>
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
