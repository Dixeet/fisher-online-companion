<template>
  <div
    class="v-card v-theme--dark v-card--density-default v-card--variant-elevated mx-auto a-fish-card"
  >
    <div class="v-responsive v-img v-img--booting mx-auto" :style="{ 'max-width': `${width}px` }">
      <div class="v-responsive__sizer" style="padding-bottom: 50%"></div>
      <img
        :alt="fishImgUrl ? fish.name : undefined"
        class="v-img__img v-img__img--contain"
        :src="fishImgUrl"
        onerror="this.style.filter = 'invert(0.8)';this.src='/images/fallback-fish.svg'"
        onload="if(!this.src.includes('/images/fallback-fish.svg')) {this.style.filter = 'invert(0)'}"
        style=""
      />
      <div class="v-responsive__content">
        <slot name="image-content"></slot>
      </div>
    </div>
    <div class="v-card-title text-align--center">{{ fish.name }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { VCard } from 'vuetify/components';
import { computed } from 'vue';
import { useImageUrl } from '~/composables/useImageUrl.js';

const props = defineProps({
  fish: {
    type: Object,
    required: true,
  },
  width: {
    type: String,
    default: undefined,
  },
});

const fishImgUrl = computed(() => {
  return props.fish.id ? useImageUrl(`fishes/${props.fish.id}.webp`) : null;
});
</script>

<style></style>
