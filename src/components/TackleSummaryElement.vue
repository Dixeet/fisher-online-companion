<template>
  <div class="d-flex align-center">
    <div class="mr-2">
      <v-icon size="large">
        <slot />
      </v-icon>
    </div>
    <div class="flex-grow-1">
      <div class="text-body-2" :class="{ 'a-tackle__single-line': !parResolver }">
        {{ equipment.name }}
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
defineProps({
  equipment: {
    type: Object,
    required: true,
  },
  parResolver: {
    type: Array,
    default: null,
  },
});
</script>

<style lang="scss">
.a-tackle__single-line {
  line-height: 32px;
}
</style>
