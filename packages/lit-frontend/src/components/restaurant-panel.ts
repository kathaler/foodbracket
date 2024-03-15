import { css, html, unsafeCSS } from "lit";
import * as App from "../app";
import { property } from "lit/decorators.js";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";
import { Restaurant } from "ts-models";

export class RestaurantPanelElement extends App.View {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Object })
  restaurant: Restaurant = {} as Restaurant;

  @property()
  side: "left" | "right" = "right";

  static styles = [
    unsafeCSS(pageCSS),
    unsafeCSS(resetCSS),
    css`
      :host {
        --panel-width: 45vw;
        --header-height: var(--header-height, 70px);
      }

      .panel {
        position: fixed;
        bottom: 0;
        width: var(--panel-width);
        height: 85vh;
        background-color: var(--tertiary-color);
        transition: transform 0.5s ease-in-out;
        z-index: 10;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        padding: var(--padding-standard);
      }

      .panel.open.right,
      .panel.open.left {
        transform: translateX(0%);
      }

      .panel:hover {
        background-color: var(--secondary-color);
      }

      .right {
        right: 0;
        transform: translateX(100%);
      }

      .left {
        left: 0;
        transform: translateX(-100%);
      }

      .name,
      .ratings,
      .delivery,
      .price-range,
      .food-type {
        color: var(--font-color-default);
        font-family: var(--font-family-primary);
      }

      .name {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: var(--padding-standard);
      }

      .photo {
        width: 25%;
        height: auto;
        border-radius: var(--padding-standard);
        margin-bottom: var(--padding-standard);
      }

      .ratings {
        display: flex;
        align-items: center;
        margin-bottom: var(--padding-standard);
      }

      .rating-icon {
        color: #f8ce0b;
        margin-right: var(--padding-standard);
      }

      .delivery,
      .price-range,
      .address {
        margin-bottom: var(--padding-standard);
        font-family: var(--font-family-secondary);
        color: var(--font-color-tertiary);
        display: flex;
        padding: var(--padding-standard);
      }

      @media (max-width: 768px) {
        :host {
          --panel-width: 80vw;
        }
      }

      .label {
        color: #a17a7a;
        padding-right: var(--padding-standard);
      }
    `,
  ];

  render() {
    return html`
      <div
        class="panel ${this.open ? "open" : ""} ${this.side}"
        @click=${this._handleClick}
      >
        ${this.restaurant
          ? html` <div class="card">
              <div class="name">${this.restaurant.name}</div>
              <img class="photo" src="${this.restaurant.photo}" />
              <div class="ratings">
                <span class="rating-icon">⭐</span>
                ${this.restaurant.ratings}
              </div>
              <div class="delivery">
                <div class="label">Delivery:</div>
                ${this.restaurant.delivery ? "Yes" : "No"}
              </div>
              <div class="price-range">
                <div class="label">Price Range:</div>
                ${this.restaurant.price}
              </div>
              <div class="address">
                <div class="label">Address:</div>
                ${this.restaurant.location}
              </div>
            </div>`
          : html``}
      </div>
    `;
  }

  firstUpdated() {
    this.openPanel();
    this.requestUpdate();
  }

  openPanel() {
    setTimeout(() => {
      this.open = true;
    }, 100);
  }

  closePanel() {
    this.open = false;
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  _handleClick(event: Event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("panel-clicked", {
        detail: {
          restaurant: this.restaurant,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("restaurant-panel", RestaurantPanelElement);
