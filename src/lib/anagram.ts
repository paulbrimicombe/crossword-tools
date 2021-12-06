import { words } from './words.js';

export const solve = async (inputChars: string) => {
  const charArray = [...inputChars.toLocaleLowerCase()];
  const charCounts = new Map();
  charArray.forEach((character) => {
    charCounts.set(character, (charCounts.get(character) ?? 0) + 1);
  });
  const charCountArray = [...charCounts.entries()];
  const matches = (await words).filter(
    (word) =>
      word.length === inputChars.length &&
      charArray.every((character) => word.includes(character)) &&
      word !== inputChars &&
      charCountArray.every(
        ([character, count]) =>
          [...word].filter((char) => character === char).length === count
      )
  );
  return matches;
};
