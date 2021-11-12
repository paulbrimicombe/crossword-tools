import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('crossword-tools-paper')
export class Paper extends LitElement {
  static styles = css`
    .paper {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      background-color: lightyellow;
      padding: 0.5em;
      border-radius: 2px;
      margin: 1em;
    }
  `;

  render() {
    return html`
      <div class="paper">
        <slot></slot>
      </div>
    `;
  }
}
