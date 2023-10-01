import { useDb } from '~/composables/useDb.js';
import { computed, isRef, ref, shallowRef, toRef, watchEffect } from 'vue';
import { refDebounced } from '@vueuse/core';

const defaultOptions = {
  limit: 18,
  debounce: 500,
  shallow: true,
};

export function useFetchTableRecords(
  request,
  search = null,
  page = null,
  options = defaultOptions,
) {
  options = { ...defaultOptions, ...options };

  const pageNumber = page ? toRef(page) : page;
  const filter =
    isRef(search) && options.debounce ? refDebounced(search, options.debounce) : undefined;

  const data = options.shallow ? shallowRef([]) : ref([]);
  const count = ref(null);
  const numberOfPages = options.limit
    ? computed(() => Math.ceil(count.value / options.limit))
    : null;

  const db = useDb();
  let oldFilterValue = filter?.value ?? filter;

  watchEffect(query);

  function query() {
    let reqData = request(db, filter);
    if ((isRef(filter) && filter?.value !== oldFilterValue) || count?.value === null) {
      oldFilterValue = filter?.value;
      request(db, filter).count((res) => (count.value = res));
      if (isRef(pageNumber)) {
        pageNumber.value = 1;
      }
    }
    if (pageNumber?.value) {
      const offset = (pageNumber.value - 1) * options.limit;
      reqData = reqData.offset(offset).limit(options.limit);
    }
    reqData.toArray((res) => (data.value = res));
  }

  return { data, count, numberOfPages, page: pageNumber, query };
}
