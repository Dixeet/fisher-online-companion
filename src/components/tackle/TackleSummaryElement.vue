<template>
  <div class="d-flex align-center">
    <div class="mr-2">
      <img
        :alt="imgUrl ? equipment.name : undefined"
        class="d-block"
        width="32"
        :src="imgUrl"
        onerror="this.removeAttribute('src');this.removeAttribute('alt')"
      />
    </div>
    <div class="flex-grow-1" style="min-width: 0">
      <div class="d-flex justify-space-between">
        <div
          class="flex-grow-1 text-body-2 text-ellipsis"
          :class="{ 'a-tackle__single-line': !parResolver, 'a-cursor--pointer': editable }"
          @click.stop="$emit('edit')"
        >
          {{ equipment.name }}
        </div>
        <v-btn
          v-if="editable && equipment.id"
          alt="Remove equipment"
          variant="plain"
          density="compact"
          size="small"
          icon
          @click.stop="$emit('clear')"
        >
          <v-icon size="small-xs"><i-mdi-close></i-mdi-close></v-icon>
        </v-btn>
      </div>
      <div
        v-if="parResolver"
        class="d-flex flex-wrap justify-space-between text-body-3 text-disabled"
      >
        <div v-for="(par, index) in parResolver" :key="`par-${index}`" class="mr-1">
          {{ par(equipment.par, index) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useImageUrl } from '~/composables/useImageUrl.js';

const props = defineProps({
  equipment: {
    type: Object,
    required: true,
  },
  parResolver: {
    type: Array,
    default: null,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

const imgUrl = computed(() => {
  const id = props.equipment.imgId ?? props.equipment.id;
  return id ? useImageUrl(`weapons/${id}.webp`) : null;
});

defineEmits(['edit', 'clear']);
</script>

<style lang="scss">
.a-tackle__single-line {
  line-height: 32px !important;
}
</style>
