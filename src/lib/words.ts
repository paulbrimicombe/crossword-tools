const wordsHref = new URL('../../../assets/words.txt', import.meta.url).href;

export const words = fetch(wordsHref)
  .then((response) => response.text())
  .then((text) => text.split(','))
  .catch(() => []);
