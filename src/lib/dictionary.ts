type DictionaryAPIWord = {
  word: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
    }[];
  }[];
};

type DictionaryAPIResponse = DictionaryAPIWord[];

export type DictionaryEntry = {
  word: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
    }[];
  }[];
};

export class NotFoundError extends Error {
  readonly code = 'NOT_FOUND';

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export const lookup = async (word: string): Promise<DictionaryEntry[]> => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (response.status === 404) {
    const error = new NotFoundError(`Word ${word} not found`);
    (error as unknown as Record<string, string>).code = 'NOT_FOUND';
    throw error;
  }

  if (!response.ok) {
    throw new Error('Error fetching word definition');
  }
  const body = (await response.json()) as DictionaryAPIResponse;
  return body;
};
