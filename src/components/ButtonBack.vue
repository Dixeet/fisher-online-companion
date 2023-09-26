<template>
  <v-btn density="default" size="small" :icon="IconBack" @click.stop="back" />
</template>

<script setup>
import IconBack from '~icons/pajamas/go-back';
import { useRouter } from 'vue-router';

const router = useRouter();

function back() {
  router.back();
}
</script>

<style></style>
