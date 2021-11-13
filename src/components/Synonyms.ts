import { LitElement, html, css } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { lookup } from '../lib/dictionary.js';
import type { DictionaryEntry, NotFoundError } from '../lib/dictionary';
import './Word.js';
import './Paper.js';

@customElement('crossword-tools-synonyms')
export class Synonyms extends LitElement {
  @state()
  private dictionaryEntries: DictionaryEntry[] = [];

  @state()
  private results: string[] = [];

  @state()
  private lookupError: string | null = null;

  private _value: string = '';

  private changeInput = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const inputString = formData.get('input')?.toString() || '';
    this._value = inputString;
    this.lookupError = null;
    this.results = [];
    this.dictionaryEntries = [];

    if (!inputString) {
      return;
    }

    try {
      this.dictionaryEntries = await lookup(inputString);

      this.results = this.dictionaryEntries
        .flatMap((entry) =>
          entry.meanings.flatMap((meaning) =>
            meaning.definitions.flatMap((definition) => definition.synonyms)
          )
        )
        .sort();

      this.lookupError = null;

      if (this.results.length === 0) {
        this.lookupError = 'No synonyms found';
      }
    } catch (error) {
      if ((error as NotFoundError).code === 'NOT_FOUND') {
        this.lookupError = "I'm sorry, I don't know that word";
      } else {
        this.lookupError =
          "I'm sorry, but there was an error fetching the definition";
      }
    }
  };

  static styles = css`
    main {
      display: flex;
      flex-direction: column;
    }

    label {
      margin: 0.5em 0;
    }

    input {
      max-width: 15em;
      font-size: inherit;
    }

    .definitions {
      margin: 0.5em 0 1em 0;
      padding: 0 1em;
    }

    .definitions li {
      margin-bottom: 1em;
    }

    li {
      list-style-type: none;
    }
  `;

  render() {
    return html`
      <main>
        <label for="synonyms-input">Enter word to find synonyms for:</label>
        <form @submit=${this.changeInput}>
          <input
            name="input"
            id="synonyms-input"
            type="text"
            minlength="2"
            required
          />
          <input type="submit" value="Go!" />
        </form>
        ${this.dictionaryEntries.length > 0
          ? html`<crossword-tools-word
              value=${this._value}
              .dictionaryEntries=${this.dictionaryEntries}
              .readonly=${true}
            ></crossword-tools-word>`
          : ''}
        ${this.lookupError
          ? html`<crossword-tools-paper class="warning"
              >${this.lookupError}</crossword-tools-paper
            >`
          : ''}
        ${this.results.length > 0
          ? html`<h2>Synonyms</h2>
              <ul class="definitions">
                ${this.results.map(
                  (word) =>
                    html`<li key="{word}">
                      <crossword-tools-word
                        value="${word}"
                      ></crossword-tools-word>
                    </li>`
                )}
              </ul>`
          : ''}
      </main>
    `;
  }
}
