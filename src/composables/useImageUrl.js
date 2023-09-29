export function useImageUrl(file) {
  return new URL(`/src/assets/images/${file}`, import.meta.url).href;
}
