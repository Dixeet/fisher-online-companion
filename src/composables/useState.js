import { ref } from 'vue';

const state = {};

export function useState(key, defaultValue) {
  if (defaultValue === null && state[key]) {
    delete state[key];
    return;
  }
  if (state[key]) {
    return state[key];
  } else {
    state[key] = ref(typeof defaultValue === 'function' ? defaultValue() : defaultValue);
    return state[key];
  }
}
