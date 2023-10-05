<template>
  <div class="a-map-selector">
    <router-link to="/">
      <v-img :src="mapImageUrl">
        <div
          class="d-flex justify-center align-center h-100"
          style="background: rgba(0, 0, 0, 0.3); padding: 10px"
        >
          <div class="text-h6">
            <v-icon><i-game-fishing-pole></i-game-fishing-pole></v-icon> Go Fishing
          </div>
        </div>
      </v-img>
    </router-link>
    <v-select
      v-model="map"
      :eager="true"
      :items="maps"
      hide-details
      underline
      placeholder="Choose a location"
    >
      <template #selection="{ item }">
        <div :key="item.raw.id">{{ item.raw?.name || 'Choose a location' }}</div>
      </template>
      <template #item="{ props, item }">
        <v-list-item :key="item.raw.id" v-bind="props" :title="item.raw.name"></v-list-item>
      </template>
    </v-select>
  </div>
</template>

<script setup>
import { useQueryDb } from '~/composables/useDb.js';
import { computed, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';
import { useImageUrl } from '~/composables/useImageUrl.js';

const map = useStorage('currentMap', {});
const { state: maps } = useQueryDb((db) => db.maps.toArray(), []);

const mapImageUrl = computed(() => {
  return map.value.id ? useImageUrl(`maps/${map.value.id}.webp`) : null;
});

watchEffect(() => {
  maps.value.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
});
</script>

<style lang="scss">
.a-map-selector {
  .v-field {
    border-radius: 0;
    .v-field__input {
      justify-content: center;
    }
  }
}
</style>
