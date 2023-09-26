<template>
  <v-navigation-drawer v-model="open" location="right">
    <v-list>
      <v-list-item title="Drawer right"></v-list-item>
    </v-list>
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
