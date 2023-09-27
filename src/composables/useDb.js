import { useAsyncState } from '@vueuse/core';

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
