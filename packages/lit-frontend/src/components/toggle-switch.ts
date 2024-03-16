import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class ToggleSwitchElement extends LitElement {
  @property({ type: Boolean })
  on = false;

  render() {
    return html`
    <div class='switch-container'>
      <svg class="icon">
        <use href="/icons/map-markers.svg#icon-information"></use>
      </svg>
      <div class="switch ${this.on ? "on" : ""}" @click="${this.toggle}"></div>
    </div>
    `;
  }

  static styles = css`

    .switch-container {
      display: flex;
      align-items: center;
      max-width: fit-content;
      padding-right: 50px;
    }

    .icon {
        width: 30px;
        height: 30px;
        fill: var(--primary-color);
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
      background-color: #ccc;
      border-radius: 20px;
      cursor: pointer;
    }

    .switch::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: white;
      top: 2px;
      left: 2px;
      transition: transform 0.2s;
    }

    .switch.on {
      background-color: #2196f3;
    }

    .switch.on::before {
      transform: translateX(20px);
    }
  `;

  toggle() {
    this.on = !this.on;
    this.requestUpdate();

    const newBody: string = this.on ? "light" : "dark";
    const body: HTMLElement | null = document.getElementById("body");
    body?.classList.remove("light", "dark");
    document.body.classList.add(newBody);
  }
}

customElements.define("toggle-switch", ToggleSwitchElement);
