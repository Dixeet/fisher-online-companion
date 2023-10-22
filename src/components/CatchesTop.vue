<template>
  <div>
    <div class="d-flex justify-space-between align-center pl-5 pr-3 mt-2 mb-1">
      <div class="text-body-3 text-disabled">Total: {{ total }}</div>
      <v-btn
        color="secondary"
        variant="tonal"
        size="x-small"
        alt="Clear all catches"
        @click.stop="clearAll"
        >clear</v-btn
      >
    </div>
    <v-expansion-panels class="a-catches-panels" variant="accordion">
      <v-expansion-panel density="compact" rounded="0" title="Top Baits / Lures">
        <template #text>
          <BaitCard
            v-for="bait in baits"
            :key="bait.id"
            class="rounded-0 elevation-0"
            img-height="32"
            :text-classes="['text-body-2']"
            :equipment="bait"
          >
            <template #subtext>
              <div
                class="text-body-3 font-weight-thin text-disabled d-flex flex-wrap justify-space-between"
              >
                <div>count: {{ bait.count }}</div>
                <div>
                  <v-btn
                    alt="Clear Bait"
                    class="mr-2"
                    variant="text"
                    density="compact"
                    size="small"
                    color="error"
                    icon
                    @click.stop="clearBait(bait)"
                  >
                    <v-icon size="small"><i-mdi-delete></i-mdi-delete></v-icon>
                  </v-btn>
                  <v-btn
                    alt="Delete a bait"
                    variant="text"
                    density="compact"
                    color="secondary"
                    size="small"
                    icon
                    @click.stop="minusOneBait(bait)"
                  >
                    <v-icon size="large"><i-mdi-minus-one></i-mdi-minus-one></v-icon>
                  </v-btn>
                </div>
              </div>
            </template>
          </BaitCard>
          <v-pagination
            v-model="pageBait"
            density="compact"
            :length="pageBaitCount"
            rounded="0"
          ></v-pagination>
        </template>
      </v-expansion-panel>
      <v-expansion-panel rounded="0" title="Top Positions">
        <template #text>
          <v-table density="compact">
            <thead>
              <tr>
                <th class="text-left text-body-2">
                  <div class="d-inline-flex align-center">Position</div>
                </th>
                <th class="text-left text-body-2">
                  <div class="d-inline-flex align-center">Count</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bait in positions" :key="bait.id">
                <td>
                  <div class="text-body-2">
                    {{ bait.position }}
                  </div>
                </td>
                <td
                  class="text-right text-body-2 d-flex flex-wrap justify-space-between align-center"
                >
                  <div>{{ bait.count }}</div>
                  <div>
                    <v-btn
                      alt="Clear Bait"
                      class="ml-2"
                      variant="text"
                      density="compact"
                      size="small"
                      color="error"
                      icon
                      @click.stop="clearBait(bait)"
                    >
                      <v-icon size="small"><i-mdi-delete></i-mdi-delete></v-icon>
                    </v-btn>
                    <v-btn
                      alt="Delete a bait"
                      variant="text"
                      density="compact"
                      color="secondary"
                      size="small"
                      icon
                      @click.stop="minusOneBait(bait)"
                    >
                      <v-icon size="large"><i-mdi-minus-one></i-mdi-minus-one></v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-pagination
            v-model="pagePosition"
            density="compact"
            :length="pagePositionCount"
            rounded="0"
          ></v-pagination>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { useDb } from '~/composables/useDb.js';
import { computed, shallowRef, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const props = defineProps({
  fishId: {
    type: String,
    required: true,
  },
  mapId: {
    type: String,
    required: true,
  },
  max: {
    type: Number,
    default: 5,
  },
  catchAddedId: {
    type: Number,
    default: 0,
  },
});

const db = useDb();

const total = shallowRef(0);

const baitsSorted = shallowRef([]);
const pageBait = shallowRef(1);
const pageBaitCount = computed(() => Math.ceil(baitsSorted.value.length / props.max));
const baits = computed(() =>
  baitsSorted.value.slice(props.max * (pageBait.value - 1), props.max * pageBait.value),
);

const positionsSorted = shallowRef([]);
const pagePosition = shallowRef(1);
const pagePositionCount = computed(() => Math.ceil(positionsSorted.value.length / props.max));
const positions = computed(() =>
  positionsSorted.value.slice(props.max * (pagePosition.value - 1), props.max * pagePosition.value),
);

const fetchTops = useDebounceFn(() => {
  db.catches
    .where('fishId')
    .equals(props.fishId)
    .and((el) => el.mapId === props.mapId)
    .toArray((res) => {
      if (res) {
        total.value = 0;
        const lBaits = [];
        const lPositions = [];
        for (const catched of res) {
          total.value++;
          const baitFind = lBaits.find((b) => b.id === catched.bait.id);
          if (!baitFind) {
            lBaits.push({
              ...catched.bait,
              count: 1,
              catchesId: [catched.id],
            });
          } else {
            baitFind.count++;
            baitFind.catchesId.push(catched.id);
          }
          if (catched.position) {
            const positionFind = lPositions.find((b) => b.position === catched.position);
            if (!positionFind) {
              lPositions.push({
                position: catched.position,
                count: 1,
                catchesId: [catched.id],
              });
            } else {
              positionFind.count++;
              positionFind.catchesId.push(catched.id);
            }
          }
        }
        baitsSorted.value = lBaits.sort((a, b) => {
          const res = b.count - a.count;
          if (res) {
            return res;
          }
          return a.name.localeCompare(b.name);
        });
        positionsSorted.value = lPositions.sort((a, b) => {
          const res = b.count - a.count;
          if (res) {
            return res;
          }
          return a.position.localeCompare(b.position);
        });
      }
    });
}, 250);

watch(
  () => props.catchAddedId,
  () => {
    fetchTops();
  },
  { immediate: true },
);

function minusOneBait(bait) {
  if (bait?.catchesId?.length) {
    db.catches.delete(bait.catchesId[bait.catchesId.length - 1]).then(() => {
      fetchTops();
    });
  }
}

function clearBait(bait) {
  if (bait?.catchesId?.length) {
    db.catches
      .where('id')
      .anyOf(bait.catchesId)
      .delete()
      .then(() => {
        fetchTops();
      });
  }
}

function clearAll() {
  db.catches
    .where('fishId')
    .equals(props.fishId)
    .and((el) => el.mapId === props.mapId)
    .delete()
    .then(() => {
      fetchTops();
    });
}
</script>

<style lang="scss">
.a-catches-panels {
  .v-expansion-panel-text__wrapper {
    padding-left: 0;
    padding-right: 0;
  }
  .v-expansion-panel--active > .v-expansion-panel-title {
    min-height: 48px;
  }
}
</style>
