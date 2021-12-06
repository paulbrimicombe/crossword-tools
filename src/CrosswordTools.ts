/* eslint-disable no-nested-ternary */
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './components/Anagram.js';
import './components/MissingLetters.js';
import './components/Synonyms.js';

const logo = new URL('../../assets/crossword-tools-logo.svg', import.meta.url)
  .href;

type Mode = 'MissingLetters' | 'Anagrams' | 'Synonyms';

export class CrosswordTools extends LitElement {
  @property({ type: String }) title = 'Crossword solving tools';

  @property({ type: String })
  private mode: Mode = 'MissingLetters';

  private switchMode = (mode: Mode) => {
    this.mode = mode;
  };

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 1vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: left;
      background-color: var(--crossword-tools-background-color);
    }

    h1 {
      margin: 1em 0 1em 0;
    }

    .title {
      display: flex;
      align-items: center;
    }

    .title img {
      margin-right: 0.5em;
      box-shadow: rgb(0 0 0 / 34%) 0px 2px 5px;
    }

    main {
      flex-grow: 1;
      width: 90%;
    }

    button {
      border: none;
      cursor: pointer;
      flex: 1;
      border: 1px solid transparent;
      background-color: lightgrey;
      height: 2em;
      max-width: 10em;
      box-sizing: content-box;
      font-size: inherit;
      transition-property: background-color border-color;
      transition-duration: 0.5s;
      transition-timing-function: ease;
    }

    button:hover {
      border: 1px solid grey;
    }

    .active {
      background-color: lightyellow;
    }

    .nav {
      display: flex;
    }

    .filler {
      border-bottom: 1px solid grey;
      flex: 1;
    }

    .content {
      margin: 0.3em 0.3em;
    }

    .footer {
      flex-shrink: 0;
      font-size: 0.8em;
      text-align: left;
      width: 90%;
      padding: 1em;
    }
  `;

  render() {
    return html`
      <main>
        <div class="title">
          <img height="40" width="40" alt="Crossword tools logo" src=${logo} />
          <h1>${this.title}</h1>
        </div>
        <div class="nav" role="navigation">
          <button
            @click=${() => this.switchMode('MissingLetters')}
            class="${this.mode === 'MissingLetters' ? 'active' : ''}"
          >
            Solver
          </button>
          <button
            @click=${() => this.switchMode('Anagrams')}
            class="${this.mode === 'Anagrams' ? 'active' : ''}"
          >
            Anagrams
          </button>
          <button
            @click=${() => this.switchMode('Synonyms')}
            class="${this.mode === 'Synonyms' ? 'active' : ''}"
          >
            Synonyms
          </button>
          <div class="filler"></div>
        </div>
        <div class="content">
          ${this.mode === 'MissingLetters'
            ? html`<crossword-tools-missing-letters>
              </crossword-tools-missing-letters>`
            : this.mode === 'Anagrams'
            ? html`<crossword-tools-anagram> </crossword-tools-anagram>`
            : this.mode === 'Synonyms'
            ? html`<crossword-tools-synonyms> </crossword-tools-synonyms>`
            : ''}
        </div>
      </main>
      <div class="footer">
        <a
          href="https://github.com/dwyl/english-words"
          target="_blank"
          rel="noopener noreferrer"
          >English words list source</a
        >
        / Word definitions are retrieved from the
        <a
          href="https://dictionaryapi.dev/"
          target="_blank"
          rel="noopener noreferrer"
          >Free Dictionary API</a
        >.
      </div>
    `;
  }
}
