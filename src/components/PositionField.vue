<template>
  <v-text-field
    v-model="input"
    rounded="0"
    density="compact"
    :placeholder="placeholder"
    variant="outlined"
    :label="label"
    :rules="[rule]"
    clearable
  >
  </v-text-field>
</template>

<script setup>
import { refDebounced } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: 'Position',
  },
  placeholder: {
    type: String,
    default: 'C11',
  },
});
const emit = defineEmits(['update:modelValue']);

const input = ref(props.modelValue.value);
const position = refDebounced(input, 500);
const rule = (value) =>
  !value || /[a-l|A-L]{1}([1-9]|1[1-2])$/g.test(value) || 'Wrong format e.g: G8';

watchEffect(() => {
  if (typeof position.value === 'string') {
    if (typeof rule(position.value) === 'boolean') {
      emit('update:modelValue', position.value.toUpperCase());
    }
  } else {
    emit('update:modelValue', '');
  }
});
</script>

<style></style>
