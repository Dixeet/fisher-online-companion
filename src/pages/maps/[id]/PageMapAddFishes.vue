<template>
  <div>
    <v-text-field v-model="search" variant="outlined" label="Search" clearable>
      <template #details>
        <div class="mb-2">{{ count }}&nbsp;fishes</div>
      </template>
    </v-text-field>
    <FishListCard :fishes="fishes"></FishListCard>
    <div v-show="fishes.length" class="text-center mx-auto a-list__paginator mt-2">
      <v-pagination v-model="page" active-color="primary" :length="numberOfPages"></v-pagination>
    </div>
  </div>
</template>

<script setup>
import { useState } from '~/composables/useState.js';
import { ref, shallowRef, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';
import { useFetchTableRecords } from '~/composables/useFetchTableRecords.js';
import { useRoute } from 'vue-router';
import { useDb } from '~/composables/useDb.js';

const page = ref(1);
const search = ref('');
let map = null;

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
    map = useStorage('currentMap', {}, undefined, { shallow: true });
    watchMap();
  } else {
    db.maps.get(route.params.id).then((f) => {
      map = shallowRef(f);
      watchMap();
    });
  }
}

function watchMap() {
  watchEffect(() => {
    title.value = map.value?.name ? `Add fishes to ${map.value.name}` : 'Choose a location';
  });
}
</script>

<style>
.a-list__paginator {
  max-width: 500px;
}
</style>
