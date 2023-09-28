<template>
  <div class="d-flex pa-1">
    <v-tooltip location="top" text="Refetch Data">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          color="quarternary"
          rounded="0"
          density="comfortable"
          variant="text"
          :icon="IconRefreshDB"
          :loading="loadingRefetch"
          @click.stop="refetchData"
        />
      </template>
    </v-tooltip>
    <v-spacer />
    <v-tooltip location="top" text="⚠ Delete database">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          color="accent"
          rounded="0"
          density="comfortable"
          variant="text"
          :icon="IconDeleteDB"
          :loading="loadingDelete"
          @click.stop="openDialog = !openDialog"
        />
      </template>
    </v-tooltip>
    <v-dialog v-model="openDialog" width="auto">
      <v-card title="Warning">
        <v-card-text>
          You are about to <strong>delete all data</strong> in the database <br />Including your own
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click.stop="deleteDatabase">Continue</v-btn>
          <v-spacer />
          <v-btn variant="elevated" @click="openDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import IconRefreshDB from '~icons/mdi/database-sync';
import IconDeleteDB from '~icons/mdi/database-off';
import { inject, ref } from 'vue';
import { useDeleteDbData, useFetchDbData } from '~/composables/useDb.js';

const openDialog = ref(false);
const loadingDelete = ref(false);
const loadingRefetch = ref(false);
const database = inject('database');

function deleteDatabase() {
  if (database?.name) {
    loadingDelete.value = true;
    const deleteDbReq = window.indexedDB.deleteDatabase(database?.name);
    deleteDbReq.onsuccess = () => {
      openDialog.value = false;
      loadingDelete.value = false;
      console.log(`Database ${database?.name} deleted successfully`);
    };
    deleteDbReq.onerror = () => {
      openDialog.value = false;
      loadingDelete.value = false;
      console.error(`Error deleting database ${database?.name}.`);
    };
  }
}

function refetchData() {
  loadingRefetch.value = true;
  useDeleteDbData(database.dataToFetch)
    .then(() => useFetchDbData(database.dataToFetch))
    .then(() => (loadingRefetch.value = false));
}
</script>

<style></style>
