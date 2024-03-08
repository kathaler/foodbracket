import { css, html } from "lit";
import * as App from "../app";
import { property } from "lit/decorators.js";
import { Restaurant } from "ts-models";
import "../components/restaurant-panel.ts";

export class BracketPageElement extends App.View {
  @property({ type: Array })
  cards_selected: Restaurant[] = [];

  @property()
  get restaurants() {
    return this.getFromModel("selected") as Restaurant[];
  }

  static styles = css`
    .bracket {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .match {
      margin: 1rem 0;
    }
    .tournament-button {
      margin-top: 2rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
  `;

  firstUpdated() {
    this.cards_selected = this.restaurants;
    if (this.cards_selected.length > 0) {
      localStorage.setItem(
        "selectedRestaurants",
        JSON.stringify(this.shuffleArray(this.cards_selected))
      );
    } else {
      this.cards_selected = localStorage.getItem("selectedRestaurants")
        ? JSON.parse(localStorage.getItem("selectedRestaurants") as string)
        : [];
    }
  }

  shuffleArray(array: Restaurant[]): Restaurant[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  renderBracket() {
    const matches = [];
    for (let i = 0; i < this.cards_selected.length; i += 2) {
      matches.push(
        html`<div class="match">
          ${this.cards_selected[i]?.name} vs ${this.cards_selected[i + 1]?.name}
        </div>`
      );
    }
    return matches;
  }

  render() {
    return html`
      <h1>Bracket Page</h1>
      <div class="bracket">${this.renderBracket()}</div>
      <button class="tournament-button" @click=${this.beginTournament}>
        Begin Tournament
      </button>
      <restaurant-panel side="left"></restaurant-panel>
      <restaurant-panel side="right"></restaurant-panel>
    `;
  }

  beginTournament() {
    console.log("Tournament started");
  }
}
customElements.define("bracket-page", BracketPageElement);
