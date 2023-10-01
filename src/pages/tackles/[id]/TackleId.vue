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
          <template #default="{ equipment }">
            <div
              v-for="(par, index) in pars.rod"
              :key="`par-${index}`"
              class="a-equipment__infos mr-1"
            >
              {{ par(equipment.par, index) }}
            </div>
          </template>
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Reel</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.reel"
          @click.stop="chooseType('reel')"
        >
          <template #default="{ equipment }">
            <div
              v-for="(par, index) in pars.reel"
              :key="`par-${index}`"
              class="a-equipment__infos mr-1"
            >
              {{ par(equipment.par, index) }}
            </div>
          </template>
        </EquipmentCard>
      </div>
      <div v-if="tackle.rod.id" class="mb-5">
        <h4>Line</h4>
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="tackle.line"
          @click.stop="chooseType('line')"
        >
          <template #default="{ equipment }">
            <div
              v-for="(par, index) in pars.line"
              :key="`par-${index}`"
              class="a-equipment__infos mr-1"
            >
              {{ par(equipment.par, index) }}
            </div>
          </template>
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
          <template #default="{ equipment }">
            <div
              v-for="(par, index) in pars.leader"
              :key="`par-${index}`"
              class="a-equipment__infos mr-1"
            >
              {{ par(equipment.par, index) }}
            </div>
          </template>
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

    <v-dialog v-model="equimentsOpen" class="bg-background" fullscreen>
      <div class="bg-background">
        <v-btn size="small" class="ma-2" icon dark @click="close()">
          <v-icon>
            <i-mdi-close></i-mdi-close>
          </v-icon>
        </v-btn>
        <v-container>
          <EquipmentList :type="equimentType" @equipment-chosen="onChoose">
            <template #default="{ equipment }">
              <div
                v-for="(par, index) in parInfos"
                :key="`par-${index}`"
                class="a-equipment__infos mr-1"
              >
                {{ par(equipment.par, index) }}
              </div>
            </template>
          </EquipmentList>
        </v-container>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, shallowRef, toValue, toRaw } from 'vue';
import { useEquipmentInfos } from '~/composables/useEquipmentInfos.js';
import { useDb } from '~/composables/useDb.js';
import { useRoute, useRouter } from 'vue-router';
import { useNotify } from '~/composables/useNotify.js';

const equimentType = ref('rod');
const equimentsOpen = ref(false);
const tackle = ref(getNewTackle());

const db = useDb();
const router = useRouter();
const route = useRoute();
const pars = useEquipmentInfos();

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

const parInfos = shallowRef(pars.rod);

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
  parInfos.value = pars[type];
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
.a-tackle {
  position: relative;
}
.v-dialog--fullscreen > .v-overlay__content {
  background-color: rgb(var(--v-theme-background));
}
</style>
