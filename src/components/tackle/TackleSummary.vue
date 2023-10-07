<template>
  <div class="a-tackle bg-surface pa-2 pb-2">
    <div v-if="!withoutHeader" class="text-align--center d-flex align-center justify-space-between">
      <div>
        <v-btn
          v-if="isCurrentTackle || selectable"
          alt="Add or remove tackle as current tackle"
          :color="isCurrentTackle ? 'error' : 'success'"
          variant="text"
          icon
          size="small"
          density="comfortable"
          @click.stop="toggleCurrent"
        >
          <v-icon size="small">
            <i-mdi-close v-if="isCurrentTackle"></i-mdi-close>
            <i-mdi-check v-else></i-mdi-check>
          </v-icon>
        </v-btn>
      </div>
      <div class="flex-grow-1 text-ellipsis ml-2">{{ tackle.name }}</div>
      <div>
        <v-btn variant="text" icon density="compact" :to="`/tackles/${tackle.id}`">
          <v-icon size="small">
            <i-mdi-text-box-edit-outline></i-mdi-text-box-edit-outline>
          </v-icon>
        </v-btn>
      </div>
    </div>
    <TackleSummaryElement
      v-if="tackle.rod?.id || editable"
      :equipment="tackle.rod"
      :par-resolver="pars.rod"
      :editable="editable"
      @clear="$emit('clear', tackle.rod)"
      @edit="$emit('edit', tackle.rod)"
    >
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.reel?.id || editable"
      :equipment="tackle.reel"
      :par-resolver="pars.reel"
      :editable="editable"
      @clear="$emit('clear', tackle.reel)"
      @edit="$emit('edit', tackle.reel)"
    >
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.line?.id || editable"
      :equipment="tackle.line"
      :par-resolver="pars.line"
      :editable="editable"
      @clear="$emit('clear', tackle.line)"
      @edit="$emit('edit', tackle.line)"
    >
      <i-game-wire-coil></i-game-wire-coil>
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="(tackle.float?.id || editable) && tackle.rod.type?.name === 'Float rod' && !short"
      :equipment="tackle.float"
      :par-resolver="pars.float"
      :editable="editable"
      @clear="$emit('clear', tackle.float)"
      @edit="$emit('edit', tackle.float)"
    >
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.leader?.id || editable"
      :equipment="tackle.leader"
      :par-resolver="pars.leader"
      :editable="editable"
      @clear="$emit('clear', tackle.leader)"
      @edit="$emit('edit', tackle.leader)"
    >
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="(tackle.feeder?.id || editable) && tackle.rod.type?.name === 'Feeder rod' && !short"
      :equipment="tackle.feeder"
      :editable="editable"
      @clear="$emit('clear', tackle.feeder)"
      @edit="$emit('edit', tackle.feeder)"
    >
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.hook?.id || editable"
      :equipment="tackle.hook"
      :editable="editable"
      @clear="$emit('clear', tackle.hook)"
      @edit="$emit('edit', tackle.hook)"
    >
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="(tackle.bait?.id || editable) && !short"
      :equipment="tackle.bait"
      :editable="editable"
      @clear="$emit('clear', tackle.bait)"
      @edit="$emit('edit', tackle.bait)"
    >
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="(tackle.lure?.id || editable) && tackle.rod.type?.name === 'Spinning rod' && !short"
      :equipment="tackle.lure"
      :editable="editable"
      @clear="$emit('clear', tackle.lure)"
      @edit="$emit('edit', tackle.lure)"
    >
    </TackleSummaryElement>
  </div>
</template>

<script setup>
import { useEquipmentInfosShort } from '~/composables/useEquipmentInfos.js';
import { useStorage } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps({
  tackle: {
    type: Object,
    required: true,
  },
  short: {
    type: Boolean,
    required: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  withoutHeader: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['edit', 'clear']);

const pars = useEquipmentInfosShort();
const currentTackle = useStorage('currentTackle', {}, undefined, { shallow: true });
const isCurrentTackle = computed(() => {
  return currentTackle?.value && props.tackle?.id && currentTackle.value.id === props.tackle.id;
});

function toggleCurrent() {
  if (isCurrentTackle.value) {
    currentTackle.value = {};
  } else {
    currentTackle.value = props.tackle;
  }
}
</script>

<style></style>
