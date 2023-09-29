import { useDb } from '~/composables/useDb.js';
import { computed, isRef, ref, shallowRef, watch } from 'vue';
import { refDebounced } from '@vueuse/core';

const defaultOptions = {
  limit: 18,
  debounce: 500,
};

export function useFetchTableRecords(table, filter = null, page = null, options = defaultOptions) {
  options = { ...defaultOptions, ...options };
  let filterRegexName = null;

  if (filter && isRef(filter)) {
    const filterDebounced = refDebounced(filter, options.debounce);
    filterRegexName = computed(() =>
      filterDebounced.value ? new RegExp(filterDebounced.value, 'i') : null,
    );
  }

  const data = shallowRef([]);
  const count = ref(null);
  const numberOfPages = computed(() => {
    if (count.value?.valueOf && options.limit) {
      return Math.ceil(count.value / options.limit);
    }
    return 0;
  });
  const db = useDb();

  if (page && isRef(page)) {
    watch(
      page,
      () => {
        fetch(db, table, data, filterRegexName, page, options.limit);
      },
      { immediate: true },
    );
  }

  if (filterRegexName && isRef(filterRegexName)) {
    watch(
      filterRegexName,
      () => {
        if (page) {
          page.value = 1;
        }
        fetch(db, table, data, filterRegexName, page, options.limit);
        countFetch(db, table, count, filterRegexName);
      },
      { immediate: true },
    );
  }

  if (!page && !filterRegexName) {
    fetch(db, table, data);
  }

  countFetch(db, table, count, filterRegexName);

  return { data, count, numberOfPages };
}

function fetch(db, table, data, filterRegexName, page, limit) {
  let req = db[table].orderBy('name');
  if (filterRegexName?.value) {
    req = req.filter((fish) => filterRegexName.value.test(fish.name));
  }
  if (page?.value) {
    const offset = (page.value - 1) * limit;
    req = req.offset(offset).limit(limit);
  }
  req.toArray().then((f) => {
    data.value = f;
  });
}

function countFetch(db, table, count, filterRegexName) {
  let req = db[table].orderBy('name');
  if (filterRegexName?.value) {
    req = req.filter((fish) => filterRegexName.value.test(fish.name));
    req.count().then((c) => (count.value = c));
  } else {
    req.count().then((c) => (count.value = c));
  }
}
