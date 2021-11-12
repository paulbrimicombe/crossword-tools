import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { solve } from '../lib/anagram.js';
import './Word.js';

@customElement('crossword-tools-anagram')
export class Anagram extends LitElement {
  @property({ type: Array })
  private results: string[] = [];

  private changeInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.results = solve(input.value);
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
        <label for="anagram-input">Enter anagram text:</label>
        <input
          id="anagram-input"
          type="text"
          minlength="2"
          required
          @input=${this.changeInput}
        />
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
