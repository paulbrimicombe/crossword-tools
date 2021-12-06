import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { solve } from '../lib/missing-letters.js';
import './Word.js';

@customElement('crossword-tools-missing-letters')
export class MissingLetters extends LitElement {
  @property({ type: Array })
  private results: string[] = [];

  private changeInput = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.results = await solve(input.value);
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
        <label for="missing-letters-input"
          >Enter the letters you know using "?" for unknown characters:</label
        >
        <input
          id="missing-letters-input"
          type="text"
          minlength="2"
          required
          @input=${this.changeInput}
        />
        ${this.results.length > 200
          ? html`<crossword-tools-paper
              >More than 200 results — please narrow down your
              query!</crossword-tools-paper
            >`
          : html`<ul class="definitions">
              ${this.results.map(
                (word) =>
                  html`<li key="{word}">
                    <crossword-tools-word
                      value="${word}"
                    ></crossword-tools-word>
                  </li>`
              )}
            </ul>`}
      </main>
    `;
  }
}
