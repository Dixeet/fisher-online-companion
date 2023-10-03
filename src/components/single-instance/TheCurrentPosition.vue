<template>
  <v-text-field
    v-model="input"
    rounded="0"
    density="compact"
    placeholder="C11"
    variant="outlined"
    label="Current position"
    :rules="[rule]"
    clearable
  >
  </v-text-field>
</template>

<script setup>
import { refDebounced, useStorage } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const currentPosition = useStorage('currentPosition', '');
const input = ref(currentPosition.value);
const position = refDebounced(input, 500);
const rule = (value) =>
  !value || /[a-l|A-L]{1}([1-9]|1[1-2])$/g.test(value) || 'Wrong format e.g: G8';

watchEffect(() => {
  if (typeof position.value === 'string') {
    if (typeof rule(position.value) === 'boolean') {
      currentPosition.value = position.value.toUpperCase();
    }
  } else {
    currentPosition.value = '';
  }
});
</script>

<style></style>
