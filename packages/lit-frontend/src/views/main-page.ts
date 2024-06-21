import { css, html, unsafeCSS } from "lit";
import "../components/preferences-form.ts";
import "../components/card-menu.ts";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";
import * as App from "../app";
import { Restaurant } from "ts-models";
import { property } from "lit/decorators.js";

export class MainPageElement extends App.View {

  @property()
  get cards_selected() {
    return this.getFromModel("selected") as Restaurant[];
  }

  render() {
    return html`
      <div class="container">
        <div class="left">
          <section class="preferences-section">
            <h2>
              <svg class="icon">
                <use href="/icons/map-markers.svg#icon-information"></use>
              </svg>
              Begin By Selecting Your Preferences
            </h2>
            <preferences-form></preferences-form>
            <div>
              <div>
                ${this.cards_selected.length !== 0 ? html`<h2>Selected Restaurants</h2>` : html``}
                <ul>
                  ${this.cards_selected.map(
                    (restaurant) => html`<li>${restaurant.name}</li>`
                  )}
                </ul>
              </div>
              ${this.cards_selected.length === 8 ? html`<a href="/app/bracket">View Bracket</a>` : html``}
            </div>
          </section>
        </div>
        <div class="right">
          <span class="menu-header">
            <h2>Please select ${8 - this.cards_selected.length} restaurants to begin the bracket</h2>
          </span>
          <card-menu id="cardMenu" src="../data/restaurants.json"></card-menu>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.dispatchMessage({type: "ClearRestaurantFields"});

    super.connectedCallback();
    this.requestUpdate();
  }

  static styles = [unsafeCSS(resetCSS), unsafeCSS(pageCSS), css`
    li {
      color: var(--font-color-default);
    }
  `];
}

customElements.define("main-page", MainPageElement);
