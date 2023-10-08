<template>
  <div>
    <div class="d-flex align-center">
      <div class="mr-2">
        <img
          :alt="fishUrl ? fish.name : undefined"
          class="d-block"
          width="88"
          :src="fishUrl"
          onerror="this.removeAttribute('src');this.removeAttribute('alt')"
        />
      </div>
      <h2 class="text-h6">{{ count }} {{ fish.name }} caught in {{ map.name }}</h2>
      <v-btn alt="Clear catches" class="ml-2" variant="text" @click.stop="clear">clear</v-btn>
    </div>
    <v-divider class="mb-3 mt-3" />
    <div class="mb-5">
      <h4>Statistics</h4>
      <div class="v-row">
        <div class="v-col-12 v-col-sm-6 v-col-md-4 v-col-xl-2">
          <div
            v-for="(bait, index) in statistics.baitOrLure.slice(0, 5)"
            :key="`baitLure-${index}`"
            class="d-flex align-center bg-surface pl-2 mb-1"
          >
            <div class="mr-2">
              <img
                :alt="bait.img ? bait.name : undefined"
                class="d-block"
                width="32"
                :src="bait.img"
                onerror="this.removeAttribute('src');this.removeAttribute('alt')"
              />
            </div>
            <div class="flex-grow-1" style="min-width: 0">
              <div class="text-body-2 text-ellipsis">
                {{ bait.name }}
              </div>
              <div class="text-body-3 text-disabled">
                <div class="mr-1">count: {{ bait.count }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="v-col-12 v-col-sm-6 v-col-md-4 v-col-xl-2">
          <div
            v-for="(position, index) in statistics.position.slice(0, 5)"
            :key="`position-${index}`"
            class="bg-surface pl-2 mb-1"
          >
            <div class="text-body-2 text-ellipsis">
              {{ position.position }}
            </div>
            <div class="text-body-3 text-disabled">
              <div class="mr-1">count: {{ position.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4>List</h4>
    <div class="v-row">
      <div
        v-for="(catc, index) in catches"
        :key="`catch-${index}`"
        class="v-col-12 v-col-sm-6 v-col-md-4 v-col-xl-2"
      >
        <CatchSummary class="h-100" :the-catch="catc" @delete="fetchCatches"></CatchSummary>
      </div>
    </div>
    <div v-show="catches.length" class="text-center mx-auto a-list__paginator mt-2">
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
import { useDb, useQueryDb } from '~/composables/useDb.js';
import { computed, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useImageUrl } from '~/composables/useImageUrl.js';
import { useFetchTableRecords } from '~/composables/useFetchTableRecords.js';

const route = useRoute();
const db = useDb();
const statistics = reactive({
  baitOrLure: [],
  position: [],
  count: 0,
});
const routeMapId = route.params.id;
const routeFishId = route.params.fishId;

const { state: fish } = useQueryDb((db) => {
  return db.fishes.get(routeFishId);
}, {});

const { state: map } = useQueryDb((db) => {
  return db.maps.get(routeMapId);
}, {});

const fishUrl = computed(() => {
  return fish.value.id ? useImageUrl(`fishes/${fish.value.id}.webp`) : null;
});

const {
  data: catches,
  count,
  query,
  toCount,
  page,
  numberOfPages,
} = useFetchTableRecords(
  (db) => {
    return db.catches
      .where('mapId')
      .equals(routeMapId)
      .and((el) => el.fishId === routeFishId);
  },
  null,
  1,
  {
    limit: 12,
  },
);

watch(count, () => {
  statistics.count = count.value;
  buildStatistics();
});

fetchCatches();

function fetchCatches() {
  query();
  toCount();
}

function clear() {
  db.catches
    .where('mapId')
    .equals(routeMapId)
    .and((el) => el.fishId === routeFishId)
    .delete()
    .then(() => {
      fetchCatches();
    });
}

function buildStatistics() {
  db.catches
    .where('mapId')
    .equals(routeMapId)
    .and((el) => el.fishId === routeFishId)
    .toArray((data) => {
      const baitOrLureGroup = {};
      const positionGroup = {};
      for (const { tackle, position } of data) {
        let type = tackle.bait?.id ? 'bait' : 'lure';
        const id = tackle[type]?.id;
        if (id) {
          if (baitOrLureGroup[id]) {
            baitOrLureGroup[id].count += 1;
          } else {
            const imgId = tackle[type].imgId ?? tackle[type].id;
            baitOrLureGroup[id] = {
              count: 1,
              img: imgId ? useImageUrl(`weapons/${imgId}.webp`) : null,
              name: tackle[type].name,
            };
          }
        }
        if (position) {
          if (positionGroup[position]) {
            positionGroup[position]++;
          } else {
            positionGroup[position] = 1;
          }
        }
      }
      statistics.baitOrLure = Object.keys(baitOrLureGroup)
        .sort((a, b) => baitOrLureGroup[b].count - baitOrLureGroup[a].count)
        .map((id) => ({ ...baitOrLureGroup[id], id }));
      statistics.position = Object.keys(positionGroup)
        .sort((a, b) => positionGroup[b] - positionGroup[a])
        .map((id) => ({ count: positionGroup[id], position: id }));
    });
}

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<style></style>
