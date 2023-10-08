<template>
  <div>
    <v-btn to="/tackles/new">New Tackle</v-btn>
    <div class="v-row mt-2">
      <div
        v-for="(tackle, index) in tackles"
        :key="`tackle-${index}`"
        class="v-col-12 v-col-sm-6 v-col-md-4 v-col-xl-2"
      >
        <TackleSummary
          class="h-100"
          selectable
          :tackle="tackle"
          :modify-current="false"
          @tackle-chosen="onTackleChosen"
        ></TackleSummary>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDb } from '~/composables/useDb.js';
import { useStorage } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';

const tackles = ref([]);

const db = useDb();
const route = useRoute();
const router = useRouter();
const currentTackle = useStorage('currentTackle', {}, undefined, { shallow: true });

db.tackles.toArray((res) => (tackles.value = res));

function onTackleChosen(tackle) {
  if (route.query && route.query['choose-tackle-path']) {
    router.push({
      path: route.query['choose-tackle-path'],
      query: {
        'tackle-id': tackle.id,
      },
    });
  } else {
    toggleCurrent(tackle);
  }
}

function toggleCurrent(tackle) {
  const isCurrentTackle =
    currentTackle?.value && tackle?.id && currentTackle.value.id === tackle.id;

  if (isCurrentTackle) {
    currentTackle.value = {};
  } else {
    currentTackle.value = tackle;
  }
}
</script>

<style></style>
