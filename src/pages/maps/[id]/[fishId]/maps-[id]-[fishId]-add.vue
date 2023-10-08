<template>
  <form class="mx-auto" style="width: 300px" @submit.prevent="add">
    <FishCard v-if="fish" width="175" :fish="fish"></FishCard>
    <TackleSummary
      v-if="tackle"
      class="mt-5"
      :tackle="tackle"
      without-header
      editable
      @clear="onClear"
      @edit="onEdit"
    />
    <v-btn
      active
      variant="flat"
      class="mb-5"
      :to="`/tackles?choose-tackle-path=${route.path}`"
      rounded="0"
      block
      >Choose a tackle</v-btn
    >
    <PositionField v-model="position"></PositionField>
    <v-btn alt="Add a catch" color="primary" type="submit" block>Add</v-btn>
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
const tackle = ref(null);
const currentPosition = useStorage('currentPosition', '');
const position = ref(currentPosition.value);

const db = useDb();
const route = useRoute();
const router = useRouter();

init();

function init() {
  if (route.query && route.query['tackle-id']) {
    db.tackles.get(parseInt(route.query['tackle-id'])).then((res) => {
      if (res) {
        tackle.value = structuredClone(res);
        tackle.value.id = 'copy';
        delete tackle.value.name;
        router.replace({ query: {} });
      }
    });
  } else {
    tackle.value = structuredClone(toRaw(currentTackle.value));
    tackle.value.id = 'copy';
    delete tackle.value.name;
  }
  db.fishes.get(route.params.fishId).then((f) => (fish.value = f));
}

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
      router.push({ path: '/' });
    });
}
</script>

<style></style>
