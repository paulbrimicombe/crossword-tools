import { LitElement, html, css } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { lookup } from '../lib/dictionary.js';
import './Word.js';
import './Paper.js';

@customElement('crossword-tools-synonyms')
export class Synonyms extends LitElement {
  @state()
  private results: string[] = [];

  @state()
  private lookupError: string | null = null;

  private changeInput = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.lookupError = null;
    this.results = [];

    if (!input.value) {
      return;
    }

    try {
      const dictionaryEntries = await lookup(input.value);

      this.results = dictionaryEntries
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
    } catch {
      this.lookupError = "I'm sorry, I don't know that word";
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
        <input
          id="synonyms-input"
          type="text"
          minlength="2"
          required
          @input=${this.changeInput}
        />
        ${this.lookupError
          ? html`<crossword-tools-paper class="warning"
              >${this.lookupError}</crossword-tools-paper
            >`
          : ''}
        <ul class="definitions">
          ${this.results.map(
            (word) =>
              html`<li key="{word}">
                <crossword-tools-word value="${word}"></crossword-tools-word>
              </li>`
          )}
        </ul>
      </main>
    `;
  }
}
