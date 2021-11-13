import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { lookup } from '../lib/dictionary.js';
import type { DictionaryEntry, NotFoundError } from '../lib/dictionary';
import './Paper.js';

@customElement('crossword-tools-word')
export class Word extends LitElement {
  private _value: string = '';

  private _readonly = false;

  @state()
  private lookupError: string | null = null;

  @property({ type: Array })
  dictionaryEntries: DictionaryEntry[] = [];

  set readonly(value: boolean) {
    this._readonly = value;
    if (value) {
      this.fetchData();
    }
  }

  @property({ type: Boolean })
  get readonly() {
    return this._readonly;
  }

  @property({ type: String })
  get value() {
    return this._value;
  }

  set value(value: string) {
    this.lookupError = null;
    this.dictionaryEntries = [];
    this._value = value;
  }

  private fetchData = async () => {
    try {
      this.dictionaryEntries = await lookup(this.value);
    } catch (error) {
      if ((error as NotFoundError).code === 'NOT_FOUND') {
        this.lookupError = 'No definition found';
      } else {
        this.lookupError =
          "I'm sorry, but there was an error fetching the definition";
      }
    }
  };

  private toggleDefinition = async () => {
    if (this.dictionaryEntries.length === 0 && this.lookupError === null) {
      await this.fetchData();
    } else {
      this.dictionaryEntries = [];
      this.lookupError = null;
    }
  };

  static styles = css`
    main {
      display: flex;
      flex-direction: column;
    }

    input {
      max-width: 15em;
      font-size: inherit;
    }

    .dictionary-entries {
      position: relative;
      background-color: lightyellow;
      padding: 0.5em;
      display: inline-block;
      margin-top: 0.5em;
    }

    ul {
      margin: 0;
      padding: 0.5em 2em;
      font-size: 0.9em;
    }

    ol {
      list-style: none;
      counter-reset: custom-counter;
    }

    ol li {
      counter-increment: custom-counter;
    }

    ol li::before {
      content: counter(custom-counter) '. ';
      font-weight: bold;
    }

    button.close-dictionary {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      cursor: pointer;
      background-color: lightgrey;
      border: none;
      width: 1.8em;
      height: 1.8em;
      transition: background-color 0.5s ease;
    }

    button.close-dictionary:hover {
      background-color: #ddd;
    }

    button.close-dictionary:after {
      display: inline-block;
      font-size: 1em;
      content: '\\2715';
    }

    button.toggle-definition {
      border: none;
      font-size: 0.8em;
      text-decoration: underline;
      font-style: italic;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }

    .warning {
      display: inline-block;
      background-color: lightyellow;
      padding: 0.5em;
      border-radius: 0.2em;
      border: 1px solid goldenrod;
      margin: 1em;
    }

    .part-of-speech {
      padding-left: 1em;
    }
  `;

  render() {
    if (this._readonly) {
      this.fetchData();
    }
    return html`
      <div class="word">
        <div class="summary">
          ${this._readonly
            ? ''
            : html`<b>${this.value}</b>
                <sup>
                  <button
                    class="toggle-definition"
                    @click=${this.toggleDefinition}
                    title="Show/hide definition"
                  >
                    ${this.dictionaryEntries.length > 0 || this.lookupError
                      ? 'hide'
                      : 'show'}
                    definition
                  </button>
                </sup>`}
        </div>
        ${this.lookupError
          ? html`<crossword-tools-paper
              >${this.lookupError}</crossword-tools-paper
            >`
          : ''}
        ${this.dictionaryEntries.length > 0
          ? html`<crossword-tools-paper>
              ${this._readonly
                ? ''
                : html`<button
                    class="close-dictionary"
                    title="Close definitions"
                    @click=${() => {
                      this.dictionaryEntries = [];
                    }}
                  ></button>`}
              <ul>
                ${this.dictionaryEntries.map(
                  (entry) =>
                    html`<li>
                      <div class="dictionary-entry">
                        <div><b>${entry.word}</b></div>
                        ${entry.meanings.map(
                          ({ partOfSpeech, definitions }) =>
                            html`<span class="part-of-speech"
                                ><i>(${partOfSpeech})</i></span
                              >
                              <ol>
                                ${definitions.map(
                                  ({ definition }) =>
                                    html`<li>${definition}</li>`
                                )}
                              </ol>`
                        )}
                      </div>
                    </li>`
                )}
              </ul>
            </crossword-tools-paper>`
          : ''}
      </div>
    `;
  }
}
