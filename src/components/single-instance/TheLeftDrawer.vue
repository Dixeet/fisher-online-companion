<template>
  <v-navigation-drawer v-model="open" width="285">
    <div class="h-100 d-flex flex-column justify-space-between">
      <div>
        <TheMapSelector> </TheMapSelector>
        <TheCurrentTackle class="" />
        <v-btn active variant="flat" class="mb-5" to="/tackles" rounded="0" block
          >Manage Tackles</v-btn
        >
        <TheCurrentPosition class="px-2" />
      </div>
      <TheDatabaseManager />
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { useVModel } from '@vueuse/core';
import TheCurrentPosition from '~/components/single-instance/TheCurrentPosition.vue';

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
