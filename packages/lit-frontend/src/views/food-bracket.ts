import { css, html } from "lit";
import "../components/header.ts";
import "./main-page.ts";
import "../components/vaadin-router.ts";
// MVU
import * as App from "../app";
import routes from "../routes";
import update from "../update";

export class FoodBracketElement extends App.Main {
  constructor() {
    super(update);
  }

  render() {
    return html`
      <div class="container">
        <header-element></header-element>
        <div class="main">
        <vaadin-router .routes=${routes}></vaadin-router>
  </div>
      </div>
    `;
  }

static styles = css`
  :host {
    --header-height: 70px; /* Adjust based on your header's size */
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .container {
    display: grid;
    grid-template-rows: var(--header-height) 1fr;
    height: 100%; /* Ensure the container takes full height of its parent */
  }

  .main {
    min-height: 0; /* This ensures that 1fr works correctly in all browsers */
  }
`;
}

customElements.define("food-bracket", FoodBracketElement);
