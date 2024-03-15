import { css, html, unsafeCSS } from "lit";
import * as App from "../app";
import { property, state } from "lit/decorators.js";
import { Restaurant } from "ts-models";
import "../components/restaurant-panel.ts";
import "../components/bracket-render.ts";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

export class BracketPageElement extends App.View {
  @state()
  _matches: Restaurant[] = [];
  
  @state()
  _round: number = 0;

  @property()
  get restaurants() {
    return this.getFromModel("selected") as Restaurant[];
  }

  @property( { type: Object }) 
  winner: Restaurant | null = null;

  @property({ type: Boolean})
  bracket_started = false;

  static styles = [unsafeCSS(resetCSS), unsafeCSS(pageCSS), css`
    .bracket {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--primary-color);
    }
    .match {
      margin: 1rem 0;
      font-size: 1.2rem;
      display: flex;
    }
    .tournament-button {
      margin-top: 2rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
    h1 {
      color: var(--font-color-default);
      background-color: var(--background-color);
    }
    .vs {
      color: #ca6161;
      margin: 0 1rem;
    }
  `];

  firstUpdated() {
    this._matches = this.restaurants;
    if (this._matches.length > 0) {
      localStorage.setItem(
        "selectedRestaurants",
        JSON.stringify(this.shuffleArray(this._matches))
      );
    } else {
      this._matches = localStorage.getItem("selectedRestaurants")
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
    for (let i = 0; i < this._matches.length; i += 2) {
      matches.push(
        html`<div class="match">
          ${this._matches[i]?.name} 
          <div class="vs"> vs </div> 
          ${this._matches[i + 1]?.name}
        </div>`
      );
    }
    return matches;
  }

  render() {
    return html`
      <h1>Restaurant Matchups</h1>
      <div class="bracket">${this.renderBracket()}</div>
      <button class="tournament-button" @click=${this.beginTournament}>
        Begin Tournament
      </button>
      ${this.bracket_started ? html`
      <restaurant-panel side="left" .restaurant=${this._matches[this._round * 2]}></restaurant-panel>
      <restaurant-panel side="right" .restaurant=${this._matches[(this._round * 2) + 1]}></restaurant-panel>`
      : html``}
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("panel-clicked", this.handlePanelClicked.bind(this) as unknown as EventListener);
  }

  disconnectedCallback(): void {
    document.removeEventListener("panel-clicked", this.handlePanelClicked.bind(this) as unknown as EventListener);
    super.disconnectedCallback();
  }

  async handlePanelClicked(e: CustomEvent) {
    const detail = e.detail;
    if (!detail) return;

    const leftPanel = this.shadowRoot?.querySelector("restaurant-panel[side=left]") as any;
    const rightPanel = this.shadowRoot?.querySelector("restaurant-panel[side=right]") as any;

    if(leftPanel && rightPanel) {
      await Promise.all([leftPanel.closePanel(), rightPanel.closePanel()]);
    }

    this._matches.push(detail.restaurant);
    this._round++;
    this.requestUpdate();

    if (this._round === 7) {
      console.log("Winner is", detail.restaurant);
      this.dispatchMessage({
        type: "BracketCompleted",
        winner: detail.restaurant
      })
    }

    this.updateComplete.then(() => {
      if(leftPanel && rightPanel) {
        leftPanel.openPanel();
        rightPanel.openPanel();
      }
    });
  }

  beginTournament() {
    this.bracket_started = true;
  }
}
customElements.define("bracket-page", BracketPageElement);
