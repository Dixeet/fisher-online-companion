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
          @click.stop="chooseType('rod')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Reel</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.reel"
          @click.stop="chooseType('reel')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Line</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.line"
          @click.stop="chooseType('line')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id && tackle.rod.type?.name === 'Float rod'" class="mb-5">
        <h4>Float</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.float"
          @click.stop="chooseType('float')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Leader</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.leader"
          @click.stop="chooseType('leader')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Hook</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.hook"
          @click.stop="chooseType('hook')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id && tackle.rod.type?.name === 'Spinning rod'" class="mb-5">
        <h4>Lure</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.lure"
          @click.stop="chooseType('lure')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Bait</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.bait"
          @click.stop="chooseType('bait')"
        >
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id && tackle.rod.type?.name === 'Feeder rod'" class="mb-5">
        <h4>Feeder</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.feeder"
          @click.stop="chooseType('feeder')"
        >
        </EquipmentCard>
      </div>

      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Attractant</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.attractant"
          @click.stop="chooseType('attractant')"
        >
        </EquipmentCard>
      </div>

      <v-btn class="mt-5" color="primary" type="submit" block>Save</v-btn>
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

const equimentType = ref('rod');
const equimentsOpen = ref(false);
const tackle = ref(getNewTackle());

const db = useDb();
const router = useRouter();
const route = useRoute();

if (route.params.id === 'new') {
  tackle.value = getNewTackle();
} else {
  db.tackles.get(parseInt(route.params.id)).then((data) => {
    if (data) {
      tackle.value = data;
    } else {
      router.push({ params: { id: 'new' } });
    }
  });
}

function getNewTackle() {
  return {
    name: '',
    rod: {
      name: 'Choose a rod',
    },
    reel: {
      name: 'Choose a reel',
    },
    line: {
      name: 'Choose a line',
    },
    leader: {
      name: 'Choose a leader',
    },
    hook: {
      name: 'Choose a hook',
    },
    lure: {
      name: 'Choose a lure',
    },
    bait: {
      name: 'Choose a bait',
    },
    float: {
      name: 'Choose a float',
    },
    feeder: {
      name: 'Choose a feeder',
    },
    attractant: {
      name: 'Choose a attractant',
    },
  };
}

function onChoose(equipment) {
  tackle.value[equipment.mainType] = equipment;
  close();
}

function chooseType(type) {
  equimentType.value = type;
  open();
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
    db.tackles.add(toRaw(toValue(tackle))).then((id) => {
      useNotify('Tackle created', 'quarternary');
      router.replace({ params: { id } });
    });
  }
}
</script>

<style>
.v-dialog--fullscreen > .v-overlay__content {
  background-color: rgb(var(--v-theme-background));
}
</style>
