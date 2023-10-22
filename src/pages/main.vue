<template>
  <div>
    <div class="d-flex flex-wrap mb-5">
      <v-btn color="tertiary" variant="tonal" to="/maps/current/add-fishes"
        >Add Fishes To Location</v-btn
      >
    </div>

    <FishListCard :fishes="fishes">
      <template #default="{ fish }">
        <FishCard style="overflow: visible" width="300" :fish="fish">
          <template #image-content>
            <v-btn
              alt="Remove fish from map"
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
            <div>
              <v-btn
                alt="Quick add a catch"
                color="primary"
                variant="tonal"
                density="comfortable"
                rounded="0"
                block
                style="min-height: 40px"
                @click.stop="quickAddCatch(fish)"
              >
                <template #prepend>
                  <v-icon size="large">
                    <i-game-fishing></i-game-fishing>
                  </v-icon>
                </template>
                Add a catch
              </v-btn>
              <CatchesTop
                :fish-id="fish.id"
                :map-id="map.id"
                :catch-added-id="catchAddedId"
              ></CatchesTop>
            </div>
          </template>
        </FishCard>
      </template>
    </FishListCard>
  </div>
</template>

<script setup>
import IconMinus from '~icons/mdi/minus-circle-outline';
import { useFishesInMap } from '~/composables/useFishesInMap.js';
import { useStorage } from '@vueuse/core';
import { shallowRef, watchEffect } from 'vue';
import { useState } from '~/composables/useState.js';
import { useNotify } from '~/composables/useNotify.js';
import { useDb } from '~/composables/useDb.js';

const title = useState('title');
const map = useStorage('currentMap', {}, undefined, { shallow: true });
const currentBait = useStorage('currentBait', {}, undefined, { shallow: true });
const { fishesInMap: fishes, removeFishFromMap } = useFishesInMap(map);
const currentPosition = useStorage('currentPosition', '');
const db = useDb();
const catchAddedId = shallowRef(0);

watchEffect(() => {
  title.value = map.value?.name ?? 'Fisher Online Companion';
});

function quickAddCatch(fish) {
  if (currentBait.value?.id) {
    db.catches
      .add({
        mapId: map.value.id,
        fishId: fish.id,
        bait: currentBait.value,
        position: currentPosition.value,
      })
      .then((res) => {
        catchAddedId.value = res;
        useNotify('Catch added', 'tertiary-container');
      });
  }
}
</script>
<style></style>
