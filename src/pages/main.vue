<template>
  <div>
    <div class="d-flex flex-wrap mb-5">
      <v-btn :prepend-icon="IconPlus" to="/maps/current/add-fishes">Add Fishes To Lake</v-btn>
    </div>

    <FishListCard :fishes="fishes">
      <template #default="{ fish }">
        <FishCard style="overflow: visible" width="300" :fish="fish">
          <template #image-content>
            <v-btn
              class="ma-1 a-fish-card__icon--hover"
              size="large"
              color="error"
              density="compact"
              variant="text"
              :icon="IconMinus"
              @click="removeFishFromMap(fish)"
            />
          </template>
          <template #default>
            <div class="d-flex justify-space-between px-2 mb-2">
              <v-btn
                class="tooltip"
                data-text="Quick add"
                color="primary"
                icon
                variant="text"
                density="comfortable"
                @click.stop="quickAddCatch(fish)"
              >
                <v-icon>
                  <i-mdi-plus></i-mdi-plus>
                </v-icon>
              </v-btn>
              <v-btn
                class="tooltip"
                data-text="Add a catch"
                icon
                variant="plain"
                density="comfortable"
                :to="`/maps/${map.id}/${fish.id}/add-catch`"
              >
                <v-icon size="small">
                  <i-mdi-pencil-plus></i-mdi-pencil-plus>
                </v-icon>
              </v-btn>
              <v-btn class="tooltip" data-text="List" icon variant="plain" density="comfortable">
                <v-icon>
                  <i-mdi-playlist-edit></i-mdi-playlist-edit>
                </v-icon>
              </v-btn>
            </div>
          </template>
        </FishCard>
      </template>
    </FishListCard>
  </div>
</template>

<script setup>
import IconPlus from '~icons/mdi/plus';
import IconMinus from '~icons/mdi/minus-circle-outline';
import { useFishesInMap } from '~/composables/useFishesInMap.js';
import { useStorage } from '@vueuse/core';
import { toRaw, watchEffect } from 'vue';
import { useState } from '~/composables/useState.js';
import { useNotify } from '~/composables/useNotify.js';
import { useDb } from '~/composables/useDb.js';

const title = useState('title');
const map = useStorage('currentMap', {}, undefined, { shallow: true });
const { fishesInMap: fishes, removeFishFromMap } = useFishesInMap(map);
const currentTackle = useStorage('currentTackle', {}, undefined, { shallow: true });
const currentPosition = useStorage('currentPosition', '');
const db = useDb();

watchEffect(() => {
  title.value = map.value?.name ?? 'Fisher Online Companion';
});

function quickAddCatch(fish) {
  db.catches
    .add({
      mapId: map.value.id,
      fishId: fish.id,
      tackle: structuredClone(toRaw(currentTackle.value)),
      position: currentPosition.value,
    })
    .then(() => {
      useNotify('Catch added', 'success');
    });
}
</script>
<style></style>
