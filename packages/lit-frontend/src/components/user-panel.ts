import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

class UserPanel extends LitElement {
  @property()
  avatar: string = "";

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
            <div class="header"> 
                <img src=${this.avatar} />
                <h2 name="name">John Doe</h2>
            </div>
            <div class="menu"></div>
            <div class="horizontal-line"></div>
            <ul>
                <li><a href="./profile/karl" class="button boxed">Profile</a></li>
                <li><a href="preferences.html" class="button boxed">Preferences</a></li>
                <li>Logout</li>
            </ul>
            <toggle-switch></toggle-switch>
        `;
  }
}

customElements.define("user-panel", UserPanel);
