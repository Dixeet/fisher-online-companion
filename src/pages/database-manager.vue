<template>
  <div>
    <h2 class="text-h6">Manage</h2>
    <v-divider class="mt-2 mb-3" />
    <div class="d-inline-flex flex-wrap justify-center" style="gap: 10px">
      <v-btn
        v-if="mode === 'development'"
        class="flex-grow-1"
        rounded="0"
        variant="tonal"
        alt="Refresh game data"
        :prepend-icon="IconRefreshDB"
        :loading="loadingRefetch"
        @click.stop="refetchData"
      >
        Refresh game data
      </v-btn>
      <v-btn
        class="flex-grow-1"
        color="accent"
        rounded="0"
        variant="tonal"
        alt="Delete Database"
        :prepend-icon="IconDeleteDB"
        :loading="loadingDelete"
        @click.stop="deleteClick"
      >
        Delete Database
      </v-btn>
    </div>
    <h2 class="text-h6 mt-5">Clear Data</h2>
    <v-divider class="mt-2" />
    <div>
      <v-checkbox
        v-model="dataSelected.mapFishes"
        hide-details
        density="compact"
        label="Fishes on location"
      ></v-checkbox>
      <v-checkbox
        v-model="dataSelected.catches"
        hide-details
        density="compact"
        label="Catches"
      ></v-checkbox>
      <v-btn
        alt="Clear data selected"
        class="flex-grow-1"
        rounded="0"
        variant="tonal"
        :prepend-icon="IconClearData"
        @click.stop="clearDataClick"
      >
        Clear data selected
      </v-btn>
    </div>
    <h2 class="text-h6 mt-5">Export</h2>
    <v-divider class="mt-2 mb-2" />
    <div>
      <v-btn
        alt="Export"
        rounded="0"
        variant="tonal"
        :prepend-icon="IconExport"
        @click.stop="exportData"
      >
        Export
      </v-btn>
    </div>
    <h2 class="text-h6 mt-5">Import</h2>
    <v-divider class="mt-2 mb-2" />
    <div class="d-inline-flex flex-wrap align-center justify-center" style="gap: 10px">
      <v-file-input
        v-model="files"
        class="flex-grow-1"
        density="compact"
        accept=".json"
        hide-details
        style="width: 300px"
        label="Import"
        :prepend-icon="IconImport"
      ></v-file-input>
      <v-btn
        v-if="files?.length"
        alt="Import"
        class="flex-grow-1"
        rounded="0"
        variant="tonal"
        :prepend-icon="IconImport"
        @click.stop="importData"
      >
        Import
      </v-btn>
    </div>
    <v-dialog v-model="openDialog" width="auto">
      <v-card title="Warning">
        <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component vue/no-v-html-->
        <v-card-text v-html="dialog.text"> </v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn :alt="dialog.continueText" color="warning" @click.stop="dialog.continueFn">{{
            dialog.continueText
          }}</v-btn>
          <v-btn alt="Cancel" variant="plain" @click="openDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import IconRefreshDB from '~icons/mdi/database-sync';
import IconDeleteDB from '~icons/mdi/database-off';
import IconClearData from '~icons/mdi/database-remove';
import IconExport from '~icons/mdi/database-arrow-up';
import IconImport from '~icons/mdi/database-arrow-down';
import { inject, reactive, ref } from 'vue';
import { useDb, useDeleteDbData, useFetchDbData } from '~/composables/useDb.js';
import { useNotify } from '~/composables/useNotify.js';
import { useRouter } from 'vue-router';

const openDialog = ref(false);
const loadingDelete = ref(false);
const loadingRefetch = ref(false);
const files = ref(null);
const database = inject('database');
const dialog = reactive({
  text: '',
  continueText: 'Continue',
  continueFn: null,
});
const dataSelected = reactive({
  mapFishes: false,
  catches: false,
});
const db = useDb();
const mode = ref(import.meta.env.MODE);
const router = useRouter();

function deleteDatabase() {
  if (database?.name) {
    loadingDelete.value = true;
    const deleteDbReq = window.indexedDB.deleteDatabase(database?.name);
    deleteDbReq.onsuccess = () => {
      openDialog.value = false;
      loadingDelete.value = false;
      // eslint-disable-next-line no-console
      console.log(`Database ${database?.name} deleted successfully`);
      localStorage.clear();
      router.go();
    };
    deleteDbReq.onerror = () => {
      openDialog.value = false;
      loadingDelete.value = false;
      // eslint-disable-next-line no-console
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

function deleteClick() {
  dialog.text =
    'You are about to <strong>delete</strong> the database. You may want to export your data first';
  dialog.continueFn = deleteDatabase;
  openDialog.value = true;
}

function clearDataClick() {
  dialog.text =
    'You are about to <strong>delete data saved</strong> into the database. You may want to export it first';
  dialog.continueFn = clearData;
  openDialog.value = true;
}

function clearData() {
  const dataToClear = Object.keys(dataSelected)
    .filter((key) => dataSelected[key])
    .map((el) => ({ table: el }));
  useDeleteDbData(dataToClear).then(() => (openDialog.value = false));
}

function exportData() {
  const filename = 'fisher-online-companion-export.json';
  const data = {};
  const promises = Object.keys(dataSelected).map((key) =>
    db[key].toArray().then((res) => {
      const withoutId = res.map((r) => {
        const obj = { ...r };
        if (key !== 'mapFishes') {
          delete obj.id;
        }
        return obj;
      });
      data[key] = withoutId;
    }),
  );
  Promise.all(promises).then(() => {
    const fileContent = JSON.stringify(data);
    const file = new Blob([fileContent], { type: 'application/json' });
    window.URL = window.URL || window.webkitURL;
    const element = document.createElement('a');
    element.setAttribute('href', window.URL.createObjectURL(file));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  });
}

function importData() {
  if (files.value?.length) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const data = JSON.parse(event.target.result);
      const promises = Object.keys(dataSelected)
        .filter((key) => data && data[key])
        .map((key) =>
          db[key].bulkAdd(data[key]).catch((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
          }),
        );
      Promise.all(promises).then(() => useNotify('Data Imported', 'success'));
    });
    reader.readAsText(files.value[0]);
  }
}
</script>

<style></style>
