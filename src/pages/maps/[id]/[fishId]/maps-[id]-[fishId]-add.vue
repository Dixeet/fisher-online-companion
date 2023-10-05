<template>
  <form class="mx-auto" style="width: 300px" @submit.prevent="add">
    <FishCard v-if="fish" width="175" :fish="fish"></FishCard>
    <TackleSummary
      class="my-5"
      :tackle="tackle"
      without-header
      editable
      @clear="onClear"
      @edit="onEdit"
    />
    <PositionField v-model="position"></PositionField>
    <v-btn color="primary" type="submit" block>Add</v-btn>
    <EquipmentListDialog
      v-model="equimentsOpen"
      :type="equimentType"
      @equipment-chosen="onChoose"
    ></EquipmentListDialog>
  </form>
</template>

<script setup>
import { ref, shallowRef, toRaw } from 'vue';
import { useStorage } from '@vueuse/core';
import { useNewTackle } from '~/composables/useEquipmentInfos.js';
import { useDb } from '~/composables/useDb.js';
import { useRoute, useRouter } from 'vue-router';
import { useNotify } from '~/composables/useNotify.js';

const equimentType = ref('rod');
const equimentsOpen = ref(false);
const fish = shallowRef(null);
const currentTackle = useStorage('currentTackle', {}, undefined, { shallow: true });
const tackle = ref(structuredClone(toRaw(currentTackle.value)));
const currentPosition = useStorage('currentPosition', '');
const position = ref(currentPosition.value);

const db = useDb();
const route = useRoute();
const router = useRouter();

db.fishes.get(route.params.fishId).then((f) => (fish.value = f));
tackle.value.id = 'copy';
delete tackle.value.name;

function onClear(equipment) {
  const newTackle = useNewTackle();
  tackle.value[equipment.mainType] = { ...newTackle[equipment.mainType] };
}
function onEdit(equipment) {
  equimentType.value = equipment.mainType;
  open();
}

function onChoose(equipment) {
  tackle.value[equipment.mainType] = equipment;
  close();
}
function open() {
  equimentsOpen.value = true;
}

function close() {
  equimentsOpen.value = false;
}

function add() {
  db.catches
    .add({
      mapId: route.params.id,
      fishId: route.params.fishId,
      tackle: structuredClone(toRaw(tackle.value)),
      position: position.value,
    })
    .then(() => {
      useNotify('Catch added', 'success');
      router.back();
    });
}
</script>

<style></style>
