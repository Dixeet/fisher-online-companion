<template>
  <div>
    <form class="mx-auto" style="max-width: 400px" @submit.prevent="save">
      <div class="">
        <v-text-field v-model="tackle.name" label="Name"></v-text-field>
      </div>
      <div class="mb-5">
        <h4>Rod</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.rod"
          clearable
          @clear="onClear"
          @click.stop="chooseType('rod')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Reel</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.reel"
          clearable
          @clear="onClear"
          @click.stop="chooseType('reel')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Line</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.line"
          clearable
          @clear="onClear"
          @click.stop="chooseType('line')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id && tackle.rod.type?.name === 'Float rod'" class="mb-5">
        <h4>Float</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.float"
          clearable
          @clear="onClear"
          @click.stop="chooseType('float')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Leader</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.leader"
          clearable
          @clear="onClear"
          @click.stop="chooseType('leader')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Hook</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.hook"
          clearable
          @clear="onClear"
          @click.stop="chooseType('hook')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id && tackle.rod.type?.name === 'Spinning rod'" class="mb-5">
        <h4>Lure</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.lure"
          clearable
          @clear="onClear"
          @click.stop="chooseType('lure')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Bait</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.bait"
          clearable
          @clear="onClear"
          @click.stop="chooseType('bait')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id && tackle.rod.type?.name === 'Feeder rod'" class="mb-5">
        <h4>Feeder</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.feeder"
          clearable
          @clear="onClear"
          @click.stop="chooseType('feeder')"
        >
        </EquipmentCard>
      </div>

      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Attractant</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.attractant"
          clearable
          @clear="onClear"
          @click.stop="chooseType('attractant')"
        >
        </EquipmentCard>
      </div>

      <v-btn alt="Save tackle" class="mt-5" color="primary" type="submit" block>Save</v-btn>
    </form>

    <EquipmentListDialog
      v-model="equimentsOpen"
      :type="equimentType"
      @equipment-chosen="onChoose"
    ></EquipmentListDialog>
  </div>
</template>

<script setup>
import { ref, toValue, toRaw } from 'vue';
import { useDb } from '~/composables/useDb.js';
import { useRoute, useRouter } from 'vue-router';
import { useNotify } from '~/composables/useNotify.js';
import { useNewTackle } from '~/composables/useEquipmentInfos.js';
import { useStorage } from '@vueuse/core';

const equimentType = ref('rod');
const equimentsOpen = ref(false);
const tackle = ref(useNewTackle());
const currentTackle = useStorage('currentTackle', {}, undefined, { shallow: true });

const db = useDb();
const router = useRouter();
const route = useRoute();

if (route.params.id === 'new') {
  tackle.value = useNewTackle();
} else if (route.params.id === 'current' || route.params.id === 'copy') {
  const clonedTackle = structuredClone(toRaw(currentTackle.value));
  clonedTackle.name = '';
  delete clonedTackle.id;
  tackle.value = clonedTackle;
} else {
  db.tackles.get(parseInt(route.params.id)).then((data) => {
    if (data) {
      tackle.value = data;
    } else {
      router.push({ params: { id: 'new' } });
    }
  });
}

function onChoose(equipment) {
  tackle.value[equipment.mainType] = equipment;
  if (equipment.mainType === 'hook') {
    const newTackle = useNewTackle();
    tackle.value.lure = { ...newTackle.lure };
  }
  if (equipment.mainType === 'lure') {
    const newTackle = useNewTackle();
    tackle.value.hook = { ...newTackle.hook };
    tackle.value.bait = { ...newTackle.bait };
  }
  if (equipment.mainType === 'rod' && !tackle.value.name) {
    tackle.value.name = equipment.name;
  }
  close();
}

function chooseType(type) {
  equimentType.value = type;
  open();
}

function onClear(equipment) {
  const newTackle = useNewTackle();
  tackle.value[equipment.mainType] = { ...newTackle[equipment.mainType] };
}

function open() {
  equimentsOpen.value = true;
}

function close() {
  equimentsOpen.value = false;
}

function save() {
  if (!tackle.value.name) {
    useNotify('Name required', 'error');
    return;
  }
  if (tackle.value.id) {
    db.tackles.put(toRaw(toValue(tackle))).then(() => {
      useNotify('Tackle updated', 'quarternary');
    });
  } else {
    db.tackles.add(toRaw(toValue(tackle))).then(() => {
      useNotify('Tackle created', 'quarternary');
    });
  }
  if (route.query?.back) {
    router.push({ path: route.query.back });
  } else {
    router.back();
  }
}
</script>

<style></style>
