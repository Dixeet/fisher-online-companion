<template>
  <div class="a-tackle bg-surface px-2 pb-2">
    <div class="text-align--center pa-1 d-flex align-center justify-space-betweene">
      <div>
        <v-btn
          color="success"
          :variant="isCurrentTackle ? 'tonal' : 'plain'"
          :active="isCurrentTackle"
          icon
          size="small"
          density="comfortable"
          @click.stop="toggleCurrent"
        >
          <v-icon size="small">
            <i-mdi-check></i-mdi-check>
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
      v-if="tackle.rod?.id"
      :equipment="tackle.rod"
      :par-resolver="pars.rod"
      :editable="editable"
      @clear="$emit('clear', tackle.rod)"
      @edit="$emit('edit', tackle.rod)"
    >
      <i-game-fishing-pole></i-game-fishing-pole>
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.reel?.id"
      :equipment="tackle.reel"
      :par-resolver="pars.reel"
      :editable="editable"
      @clear="$emit('clear', tackle.reel)"
      @edit="$emit('edit', tackle.reel)"
    >
      <i-game-film-spool></i-game-film-spool>
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.line?.id"
      :equipment="tackle.line"
      :par-resolver="pars.line"
      :editable="editable"
      @clear="$emit('clear', tackle.line)"
      @edit="$emit('edit', tackle.line)"
    >
      <i-game-wire-coil></i-game-wire-coil>
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.float?.id && !short"
      :equipment="tackle.float"
      :par-resolver="pars.float"
      :editable="editable"
      @clear="$emit('clear', tackle.float)"
      @edit="$emit('edit', tackle.float)"
    >
      <i-game-joint style="transform: rotate(-135deg)"></i-game-joint>
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.leader?.id"
      :equipment="tackle.leader"
      :par-resolver="pars.leader"
      :editable="editable"
      @clear="$emit('clear', tackle.leader)"
      @edit="$emit('edit', tackle.leader)"
    >
      <i-game-skipping-rope></i-game-skipping-rope>
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.feeder?.id && !short"
      :equipment="tackle.feeder"
      :editable="editable"
      @clear="$emit('clear', tackle.feeder)"
      @edit="$emit('edit', tackle.feeder)"
    >
      <i-game-full-wood-bucket></i-game-full-wood-bucket>
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.hook?.id || short"
      :equipment="tackle.hook"
      :editable="editable"
      @clear="$emit('clear', tackle.hook)"
      @edit="$emit('edit', tackle.hook)"
    >
      <i-game-fishing-hook></i-game-fishing-hook>
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.bait?.id && !short"
      :equipment="tackle.bait"
      :editable="editable"
      @clear="$emit('clear', tackle.bait)"
      @edit="$emit('edit', tackle.bait)"
    >
      <i-game-earth-worm></i-game-earth-worm>
    </TackleSummaryElement>
    <TackleSummaryElement
      v-if="tackle.lure?.id && !short"
      :equipment="tackle.lure"
      :editable="editable"
      @clear="$emit('clear', tackle.lure)"
      @edit="$emit('edit', tackle.lure)"
    >
      <i-game-fishing-lure></i-game-fishing-lure>
    </TackleSummaryElement>
  </div>
</template>

<script setup>
import { useEquipmentInfosShort } from '~/composables/useEquipmentInfos.js';
import { useStorage } from '@vueuse/core';
import { computed } from 'vue';
import TackleSummaryElement from '~/components/TackleSummaryElement.vue';

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

<style>
.a-tackle {
  height: 100%;
}
</style>
