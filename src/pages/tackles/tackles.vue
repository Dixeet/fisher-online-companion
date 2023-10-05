<template>
  <div>
    <v-btn to="/tackles/new">New Tackle</v-btn>
    <div class="v-row mt-2">
      <div
        v-for="(tackle, index) in tackles"
        :key="`tackle-${index}`"
        class="v-col-12 v-col-sm-6 v-col-md-4 v-col-xl-2"
      >
        <TackleSummary class="h-100" selectable :tackle="tackle"></TackleSummary>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDb } from '~/composables/useDb.js';

const tackles = ref([]);

const db = useDb();
db.tackles.toArray((res) => (tackles.value = res));
</script>

<style></style>
