import { words } from './words.js';

export const solve = async (inputChars: string) => {
  const charArray = [...inputChars.toLocaleLowerCase()];
  const matches = (await words).filter(
    (word) =>
      word.length === charArray.length &&
      charArray.every((char, index) => char === '?' || word[index] === char)
  );
  return matches;
};
