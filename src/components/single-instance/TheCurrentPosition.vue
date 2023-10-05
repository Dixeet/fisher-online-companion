<template>
  <PositionField v-model="currentPosition" label="Current position" />
</template>

<script setup>
import { useStorage } from '@vueuse/core';

const currentPosition = useStorage('currentPosition', '');
</script>

<style></style>
