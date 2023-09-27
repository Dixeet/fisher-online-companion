let db;

export function initDb(database) {
  db = database;
}

export function useDb() {
  return db;
}
