<template>
  <div v-if="currentTackle.id" class="">
    <TackleSummary short editable :tackle="currentTackle" @clear="onClear" @edit="onEdit" />
    <EquipmentCard
      class="a-cursor--pointer rounded-0 elevation-0"
      :equipment="currentTackle[baitOrLure]"
      clearable
      style="
        border-top: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
        border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
      "
      @clear="onClear"
      @click.stop="onEdit({ mainType: baitOrLure })"
    >
    </EquipmentCard>
    <EquipmentListDialog
      v-model="equimentsOpen"
      :type="equimentType"
      @equipment-chosen="onChoose"
    ></EquipmentListDialog>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useNewTackle } from '~/composables/useEquipmentInfos.js';

const currentTackle = useStorage('currentTackle', {});
const equimentType = ref('rod');
const equimentsOpen = ref(false);

const baitOrLure = computed(() => {
  return currentTackle.value?.hook.id ? 'bait' : 'lure';
});

function onClear(equipment) {
  const newTackle = useNewTackle();
  currentTackle.value[equipment.mainType] = { ...newTackle[equipment.mainType] };
  modify();
}
function onEdit(equipment) {
  equimentType.value = equipment.mainType;
  open();
}
function onChoose(equipment) {
  currentTackle.value[equipment.mainType] = equipment;
  modify();
  if (equipment.mainType === 'hook') {
    const newTackle = useNewTackle();
    currentTackle.value.lure = { ...newTackle.lure };
  }
  if (equipment.mainType === 'lure') {
    const newTackle = useNewTackle();
    currentTackle.value.hook = { ...newTackle.hook };
    currentTackle.value.bait = { ...newTackle.bait };
  }
  close();
}
function open() {
  equimentsOpen.value = true;
}

function close() {
  equimentsOpen.value = false;
}

function modify() {
  currentTackle.value.id = 'current';
}
</script>

<style></style>
