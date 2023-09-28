import { useAsyncState, useFetch } from '@vueuse/core';

let db;

export function initDb(database) {
  db = database;
}

export function useDb() {
  return db;
}

export function useQueryDb(queryFn, initialState) {
  return useAsyncState(queryFn(db), initialState);
}

export function useFetchDbData(dataToFetch, database = db) {
  if (!database.isOpen()) {
    db.open();
  }
  const promises = [];
  dataToFetch.forEach(({ file, table }) => {
    promises.push(
      database[table].count((count) => {
        if (!count) {
          console.log(`Fetching ${file}...`);
          return useFetch(`${import.meta.env.BASE_URL}data/${file}.json`).then(({ data }) => {
            return database[table].bulkAdd(JSON.parse(data.value));
          });
        }
      }),
    );
  });
  return Promise.all(promises);
}

export function useDeleteDbData(dataToFetch, tx = db) {
  if (db.isOpen()) {
    const promises = [];
    dataToFetch.forEach(({ table }) => {
      promises.push(tx.table(table).toCollection().delete());
    });
    return Promise.all(promises);
  }
  return Promise.resolve();
}
