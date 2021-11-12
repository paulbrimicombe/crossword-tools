import { words } from './words.js';

export const solve = (inputChars: string) => {
  const charArray = [...inputChars.toLocaleLowerCase()];
  const matches = words.filter(
    (word) =>
      word.length === charArray.length &&
      charArray.every((char, index) => char === '?' || word[index] === char)
  );
  return matches;
};
