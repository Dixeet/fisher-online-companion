import { initDixie } from '~/composables/database.js';
import { useFetch } from '@vueuse/core';
import { useState } from '~/composables/useState.js';

const DEFAULT_CONFIG = { name: 'FisherOnlineCompanion', dixieConfig: {} };
const dataToFetch = [
  { file: 'maps', table: 'maps' },
  { file: 'weapons', table: 'weapons' },
  { file: 'weapon-types', table: 'weaponTypes' },
  { file: 'fishes', table: 'fishes' },
];

export default {
  install: (app, config = DEFAULT_CONFIG) => {
    config = { ...DEFAULT_CONFIG, ...config };
    const db = initDixie(config.name, config.dixieConfig);
    onReady(db);
    migrate(db);
    db.open();
  },
};

function onReady(db) {
  db.on('ready', (db) => {
    const pending = useState('globalPending', true);
    pending.value = true;
    const promises = [];
    dataToFetch.forEach(({ file, table }) => {
      promises.push(
        db[table].count((count) => {
          if (!count) {
            console.log(`Fetching ${file}...`);
            return useFetch(`${import.meta.env.BASE_URL}data/${file}.json`).then(({ data }) => {
              return db[table].bulkAdd(JSON.parse(data.value));
            });
          }
        }),
      );
    });
    return Promise.all(promises).then(() => (pending.value = false));
  });
}

function migrate(db) {
  db.version(1).stores({
    weapons: '++id,name,type.id',
    weaponTypes: '++id,name',
    fishes: '++id,name',
    maps: '++id,name',
  });
}
