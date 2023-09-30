<template>
  <div>
    <div class="a-search__input">
      <v-text-field
        v-model="search"
        density="compact"
        placeholder="Search"
        variant="outlined"
        :label="`${count} fishes`"
        persistent-placeholder
        clearable
      >
      </v-text-field>
    </div>
    <FishListCard :fishes="fishes">
      <template #default="{ fish }">
        <FishCard width="250" :fish="fish">
          <template #image-content>
            <v-btn
              v-if="fishInMap(fish)"
              class="ma-1"
              size="large"
              color="error"
              density="compact"
              variant="text"
              :icon="IconMinus"
              @click="removeFishFromMap(fish)"
            />
            <v-btn
              v-else
              class="ma-1 a-fish-card__icon--hover"
              size="large"
              color="success"
              density="compact"
              variant="text"
              :icon="IconPlus"
              @click="addFishInMap(fish)"
            />
          </template>
        </FishCard>
      </template>
    </FishListCard>
    <div v-show="fishes.length" class="text-center mx-auto a-list__paginator mt-2">
      <v-pagination
        v-model="page"
        active-color="primary"
        :length="numberOfPages"
        @update:model-value="scrollToTop"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import IconPlus from '~icons/mdi/plus-circle-outline';
import IconMinus from '~icons/mdi/minus-circle-outline';
import { useState } from '~/composables/useState.js';
import { ref, shallowRef, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';
import { useFetchTableRecords } from '~/composables/useFetchTableRecords.js';
import { useRoute } from 'vue-router';
import { useDb } from '~/composables/useDb.js';
import { useFishesInMap } from '~/composables/useFishesInMap.js';

const page = ref(1);
const search = ref('');
const map = shallowRef({});

const { fishInMap, removeFishFromMap, addFishInMap } = useFishesInMap(map);
const db = useDb();
const title = useState('title');
const route = useRoute();
const {
  data: fishes,
  numberOfPages,
  count,
} = useFetchTableRecords('fishes', search, page, { limit: 24 });

if (route.name === 'PageMapAddFishes') {
  if (route.params.id === 'current') {
    useStorage('currentMap', map, undefined, { shallow: true });
  } else {
    db.maps.get(route.params.id).then((f) => {
      map.value = f;
    });
  }
}

watchEffect(() => {
  title.value = map.value?.name ? `Add fishes to ${map.value.name}` : 'Choose a location';
});

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<style lang="scss">
.a-list__paginator {
  max-width: 500px;
}
.a-search__input {
  margin-top: -16px;
  padding-top: 16px;
  position: sticky;
  top: 48px;
  background-color: rgb(var(--v-theme-background));
  z-index: 5;
}
</style>
