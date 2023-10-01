import { ref } from 'vue';

const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref(undefined);

export function getNotifyRefs() {
  return { snackbar, snackbarColor, snackbarText };
}

export function useNotify(text, color) {
  if (color) {
    snackbarColor.value = color;
  }
  snackbarText.value = text;
  snackbar.value = true;
}
