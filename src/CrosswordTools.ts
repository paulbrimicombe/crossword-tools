/* eslint-disable no-nested-ternary */
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './components/Anagram.js';
import './components/MissingLetters.js';
import './components/Synonyms.js';

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

    main {
      flex-grow: 1;
      width: 90%;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
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
      transition-property: background-color;
      transition-duration: 0.5s;
      transition-timing-function: ease;
    }

    button:hover {
      background-image: linear-gradient(
        to bottom,
        aliceblue 0%,
        aliceblue 80%,
        #ededed
      );
      border: 1px solid transparent;
      border-image: linear-gradient(to bottom, darkgrey, rgba(0, 0, 0, 0)) 1
        100%;
      border-bottom: transparent;
      border-image-slice: 1;
    }

    .active {
      background-color: inherit;
      border-bottom: transparent;
      border: 1px solid transparent;
      border-image: linear-gradient(to bottom, darkslategrey, rgba(0, 0, 0, 0))
        1 100%;
      border-image-slice: 1;
    }

    .nav {
      display: flex;
    }

    .content {
      margin: 0.3em 0.3em;
    }
  `;

  render() {
    return html`
      <main>
        <h1>${this.title}</h1>
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
    `;
  }
}
