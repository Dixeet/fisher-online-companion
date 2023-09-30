<template>
  <v-navigation-drawer v-model="open" width="285">
    <TheMapSelector> </TheMapSelector>
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

<style>
.v-layout .v-navigation-drawer__scrim {
  position: fixed;
}
</style>
