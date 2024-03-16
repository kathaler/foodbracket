import { html, css, LitElement } from "lit";
import "./toggle-switch";

class UserPanel extends LitElement {
  // @property()
  // avatar: string = "";

  static styles = css`
    :host {
      display: block;
      position: relative;
      padding: 8px;
      background-color: var(--border-color);
      color: var(--font-color-default);
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      padding-left: 20px;
    }

    .header {
      display: flex;
      align-items: center;
      color: black
    }

    ul {
      list-style-type: none;
      font-size: 1.2em;
    }

    .horizontal-line {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--secondary-color);
    }
    .horizontal-line {
      background-color: var(--secondary-color);
    }
  `;

  render() {
    return html`
      <ul>
        <li class="header">
          <h1><slot name="name">Your Name</slot></h1>
        </li>
        <slot></slot>
        <toggle-switch></toggle-switch>
        <li>
          <slot name="logout">Sign out&hellip;</slot>
        </li>
      </ul>
        `;
  }
}

customElements.define("user-panel", UserPanel);
