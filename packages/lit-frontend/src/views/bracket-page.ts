import { css, html } from "lit";
import * as App from "../app";
import { property, state } from "lit/decorators.js";
import { Restaurant } from "ts-models";
import "../components/restaurant-panel.ts";
import "../components/bracket-render.ts";

export class BracketPageElement extends App.View {
  @state()
  _matches: Restaurant[] = [];
  
  @state()
  _round: number = 0;

  @property()
  get restaurants() {
    return this.getFromModel("selected") as Restaurant[];
  }

  @property({ type: Boolean})
  bracket_started = false;

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
          ${this._matches[i]?.name} vs ${this._matches[i + 1]?.name}
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
