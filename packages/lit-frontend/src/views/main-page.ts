import { LitElement, html, unsafeCSS } from "lit";
import "../components/preferences-form.ts";
import "../components/card-menu.ts";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";
import * as App from "../app";
import { Restaurants } from "ts-models";
import { property } from "lit/decorators.js";

export class MainPageElement extends App.View {

  @property()
  get cards_selected() {
    return this.getFromModel("selected") as Restaurants[];
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

  static styles = [unsafeCSS(resetCSS), unsafeCSS(pageCSS)];
}

customElements.define("main-page", MainPageElement);
