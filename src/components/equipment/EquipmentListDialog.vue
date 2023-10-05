<template>
  <v-dialog v-model="equimentsOpen" class="bg-background" fullscreen>
    <div class="bg-background">
      <v-btn size="small" class="ma-2" icon dark @click="equimentsOpen = false">
        <v-icon>
          <i-mdi-close></i-mdi-close>
        </v-icon>
      </v-btn>
      <v-container>
        <EquipmentList :type="type" @equipment-chosen="onChoose"> </EquipmentList>
      </v-container>
    </div>
  </v-dialog>
</template>

<script setup>
import { useVModel } from '@vueuse/core';

const props = defineProps({
  type: {
    type: [String, Object],
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue', 'equipmentChosen']);
const equimentsOpen = useVModel(props, 'modelValue', emit);

function onChoose(equipment) {
  emit('equipmentChosen', equipment);
}
</script>

<style>
.v-dialog--fullscreen > .v-overlay__content {
  background-color: rgb(var(--v-theme-background));
}
</style>
