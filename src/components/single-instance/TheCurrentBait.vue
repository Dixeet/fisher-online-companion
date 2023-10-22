<template>
  <div>
    <div class="d-flex">
      <v-btn
        class="flex-grow-1 mr-1"
        rounded="0"
        color="primary"
        variant="tonal"
        @click.stop="openList('bait')"
        >Bait</v-btn
      >
      <v-btn
        class="flex-grow-1"
        rounded="0"
        color="primary"
        variant="tonal"
        @click.stop="openList('lure')"
        >Lure</v-btn
      >
    </div>
    <BaitCard
      v-if="currentBait.id"
      class="rounded-0 elevation-0"
      :equipment="currentBait"
      style="
        border-left: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
        border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
        border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
      "
      @clear="clear"
    >
      <v-btn
        alt="Clear Bait"
        class="a-equipment-card__delete-button"
        variant="text"
        density="compact"
        size="small"
        icon
        @click.stop="clear"
      >
        <v-icon size="small-xs"><i-mdi-close></i-mdi-close></v-icon>
      </v-btn>
    </BaitCard>
    <EquipmentListDialog
      v-model="equimentsOpen"
      :type="equimentType"
      @equipment-chosen="onChoose"
    ></EquipmentListDialog>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core';
import { ref } from 'vue';

const equimentsOpen = ref(false);
const currentBait = useStorage('currentBait', {}, undefined, { shallow: true });
const equimentType = ref('bait');

function openList(type) {
  equimentType.value = type;
  open();
}

function onChoose(bait) {
  currentBait.value = bait;
  close();
}
function clear() {
  currentBait.value = {};
}

function open() {
  equimentsOpen.value = true;
}

function close() {
  equimentsOpen.value = false;
}
</script>

<style>
.a-equipment-card__delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
