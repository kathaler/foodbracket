import { LitElement, html, css, unsafeCSS } from "lit";
import "../components/preferences-form.ts";
import "../components/card-menu.ts";
import resetCSS from "../styles/reset.css?inline";
import pageCSS from "../styles/page.css?inline";

export class MainPageElement extends LitElement {
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
            <h2>Please select 8 restaurants to begin the bracket</h2>
          </span>
          <card-menu id="cardMenu" src="../data/restaurants.json"></card-menu>
        </div>
      </div>
    `;
  }

  static styles = [unsafeCSS(resetCSS), unsafeCSS(pageCSS)];
}

customElements.define("main-page", MainPageElement);
