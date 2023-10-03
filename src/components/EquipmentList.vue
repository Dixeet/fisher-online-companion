<template>
  <div>
    <div>
      <v-text-field
        v-model="search"
        density="compact"
        placeholder="Search"
        variant="outlined"
        :label="`${count} equipments`"
        persistent-placeholder
        clearable
      >
      </v-text-field>
    </div>
    <div class="v-row">
      <div
        v-for="(equipment, index) in equipments"
        :key="index"
        class="v-col-12 v-col-sm-6 v-col-md-4 v-col-xl-3"
      >
        <EquipmentCard
          class="a-cursor--pointer"
          :equipment="equipment"
          @click.stop="onChoose(equipment)"
        >
          <slot :equipment="equipment"> </slot>
        </EquipmentCard>
      </div>
    </div>
    <div v-show="equipments.length" class="text-center mx-auto a-list__paginator mt-2">
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
import { useFetchTableRecords } from '~/composables/useFetchTableRecords.js';
import { ref, watch } from 'vue';

const props = defineProps({
  type: {
    type: [String, Object],
    required: true,
  },
});
const emit = defineEmits(['equipmentChosen']);

const page = ref(1);
const search = ref('');

const {
  data: equipments,
  count,
  query,
  numberOfPages,
} = useFetchTableRecords(
  (db, filter) => {
    return db.weapons
      .orderBy('name')
      .filter((e) => e.mainType === props.type)
      .filter((data) => new RegExp(filter.value ?? '', 'i').test(data.name));
  },
  search,
  page,
  {
    limit: 16,
  },
);

watch(
  () => props.type,
  () => {
    query();
  },
);

function onChoose(equipment) {
  emit('equipmentChosen', equipment);
}

function scrollToTop() {
  const overlayEl = document.querySelector(
    'body > div.v-overlay-container > div.v-overlay.v-overlay--active.v-dialog.bg-background > div.v-overlay__content',
  );
  if (overlayEl && overlayEl instanceof HTMLElement) {
    overlayEl.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
}
</script>

<style></style>
