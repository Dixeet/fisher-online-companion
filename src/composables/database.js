import Dexie from 'dexie';
let db;

export function initDixie(name, options = {}) {
  db = new Dexie(name, options);
  return db;
}

export function useDb() {
  return db;
}
