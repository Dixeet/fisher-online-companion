import { initDb, useFetchDbData } from '~/composables/useDb.js';
import { useState } from '~/composables/useState.js';
import Dexie from 'dexie';

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
    const db = new Dexie(config.name, config.dixieConfig);
    app.provide('database', { name: config.name, dataToFetch });
    initDb(db);
    onReady(db);
    migrate(db);
    db.open();
  },
};

function onReady(db) {
  db.on('ready', () => {
    const pending = useState('globalPending', true);
    pending.value = true;
    const promises = useFetchDbData(dataToFetch);
    return promises.then(() => (pending.value = false));
  });
}

function migrate(db) {
  db.version(1).stores({
    weapons: '++id,name,type.id',
    weaponTypes: '++id,name',
    fishes: '++id,name',
    maps: '++id,name',
  });
  /*
  To refresh with new data,
  use code below and increment VERSION_NUMBER according to the previous one

  db.version(VERSION_NUMBER).upgrade((tx) => {
    const promises = [];
    dataToFetch.forEach(({ table }) => {
      promises.push(tx.table(table).toCollection().delete());
    });
    return Promise.all(promises);
  });

*/
}
