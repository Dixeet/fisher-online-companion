<template>
  <v-navigation-drawer v-model="open" width="285">
    <div class="h-100 d-flex flex-column justify-space-between">
      <div>
        <TheMapSelector> </TheMapSelector>
        <TheCurrentPosition class="px-2" />
      </div>
      <TheLeftDrawerFooter />
    </div>
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
