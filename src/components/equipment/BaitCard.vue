<template>
  <div class="v-card v-card--variant-elevated a-equipment-card">
    <div class="d-flex align-center">
      <div class="ml-3 my-2">
        <img
          :alt="imgUrl ? equipment.name : undefined"
          class="d-block"
          :height="imgHeight"
          :src="imgUrl"
          onerror="this.removeAttribute('src');this.removeAttribute('alt')"
        />
      </div>
      <div class="px-2 flex-grow-1">
        <div :class="textClasses">
          {{ equipment.name }}
        </div>
        <slot name="subtext"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { VCard } from 'vuetify/components';
import { computed } from 'vue';
import { useImageUrl } from '~/composables/useImageUrl.js';

const props = defineProps({
  equipment: {
    type: Object,
    required: true,
  },
  imgHeight: {
    type: [Number, String],
    default: 48,
  },
  textClasses: {
    type: Array,
    default: () => ['text-align--center', 'text-body-1'],
  },
});

const imgUrl = computed(() => {
  const id = props.equipment.imgId ?? props.equipment.id;
  return id ? useImageUrl(`weapons/${id}.webp`) : null;
});
</script>

<style lang="scss">
.a-equipment-card {
  position: relative;
}
</style>
