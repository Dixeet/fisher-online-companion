<template>
  <div>
    <div class="v-row">
      <div
        v-for="(fish, index) in fishes"
        :key="index"
        class="v-col-12 v-col-sm-4 v-col-md-3 v-col-xl-2"
      >
        <slot>
          <FishCard width="250" :fish="fish" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fishes: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
