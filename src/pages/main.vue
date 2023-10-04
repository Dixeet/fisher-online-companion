<template>
  <div>
    <h3 class="mb-1">Fishes Catch</h3>
    <v-divider class="mb-5" />
    <div class="d-flex flex-wrap mb-5">
      <v-btn :prepend-icon="IconPlus" to="/maps/current/add-fishes">Add Fishes To Lake</v-btn>
    </div>

    <FishListCard :fishes="fishes">
      <template #default="{ fish }">
        <FishCard width="250" :fish="fish">
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
import { watchEffect } from 'vue';
import { useState } from '~/composables/useState.js';

const title = useState('title');
const map = useStorage('currentMap', {}, undefined, { shallow: true });
const { fishesInMap: fishes, removeFishFromMap } = useFishesInMap(map);

watchEffect(() => {
  title.value = map.value?.name ?? 'Fisher Online Companion';
});
</script>
<style></style>
