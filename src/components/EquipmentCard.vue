<template>
  <div class="v-card v-card--variant-elevated a-fish-card" :style="{ 'max-width': `${width}px` }">
    <div class="d-flex align-center">
      <div class="ml-3 my-2">
        <img class="d-block" height="48" :src="imgUrl" onerror="this.removeAttribute('src')" />
      </div>
      <div class="v-col">
        <div class="text-align--center text-body-1">{{ equipment.name }}</div>
        <div
          class="text-body-3 font-weight-thin text-disabled d-flex flex-wrap justify-space-between"
        >
          <div
            v-for="(par, index) in pars[equipment.mainType]"
            :key="`par-${index}`"
            class="a-equipment__infos mr-1"
          >
            {{ par(equipment.par, index) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { VCard } from 'vuetify/components';
import { computed } from 'vue';
import { useImageUrl } from '~/composables/useImageUrl.js';
import { useEquipmentInfos } from '~/composables/useEquipmentInfos.js';

const props = defineProps({
  equipment: {
    type: Object,
    required: true,
  },
  width: {
    type: String,
    default: undefined,
  },
});

const pars = useEquipmentInfos();

const imgUrl = computed(() => {
  const id = props.equipment.imgId ?? props.equipment.id;
  return id ? useImageUrl(`weapons/${id}.webp`) : null;
});
</script>

<style></style>
