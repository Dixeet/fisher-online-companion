<template>
  <div v-if="theCatch" class="bg-surface">
    <div class="pl-3 pr-1 pt-1 d-flex justify-space-between align-center">
      <div class="text-body-2 text-disabled">
        {{ theCatch.position }}
      </div>
      <v-btn
        icon
        color="error"
        variant="text"
        size="small"
        density="comfortable"
        @click.stop="remove"
      >
        <v-icon size="small">
          <i-mdi-close></i-mdi-close>
        </v-icon>
      </v-btn>
    </div>
    <TackleSummary :tackle="theCatch.tackle" without-header></TackleSummary>
  </div>
</template>

<script setup>
import { useDb } from '~/composables/useDb.js';

const props = defineProps({
  theCatch: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['delete']);
const db = useDb();

function remove() {
  db.catches.delete(props.theCatch.id).then(() => emit('delete'));
}
</script>

<style></style>
