import { html } from "lit";
import * as App from "../app";
import { property } from "lit/decorators.js";
import { Restaurant } from "ts-models";

export class BracketPageElement extends App.View {
  @property()
  get cards_selected() {
    return this.getFromModel("selected") as Restaurant[];
  }

  render() {
    return html`
      <h1>Bracket Page</h1>
      <p>Bracket page content goes here.</p>
      <ul>
        ${this.cards_selected.map(
          (restaurant) => html`<li>${restaurant.name}</li>`
        )}
      </ul>
    `;
  }
}
customElements.define("bracket-page", BracketPageElement);
