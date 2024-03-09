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
        --panel-width: 50vw;
        --header-height: 70px;
      }
      .panel {
        position: fixed;
        bottom: 0;
        width: var(--panel-width);
        height: 85vh;
        background-color: var(--tertiary-color);
        transition: transform 0.5s ease-in-out;
        z-index: 0;
      }
      .panel.open.right {
        transform: translateX(0%);
      }
      .panel.open.left {
        transform: translateX(0%);
      }
      .panel:hover {
        background-color: var(--secondary-color);
      }
      .right {
        transform: translateX(100%);
        right: 0;
      }
      .left {
        transform: translateX(-100%);
        left: 0;
      }
      .name,
      .ratings,
      .delivery,
      .price-range,
      .food-type {
        color: white;
      }

      .name {
        font-size: 50px;
        font-weight: bold;
        color: white;
        margin-bottom: 8px;
      }

      .photo {
        width: 25%;
        height: 25%;
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .ratings {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }

      .rating-icon {
        color: #f8ce0b;
        margin-right: 4px;
      }

      .delivery {
        margin-bottom: 8px;
      }

      .price-range {
        margin-bottom: 8px;
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
                Delivery: ${this.restaurant.delivery ? "Yes" : "No"}
              </div>
              <div class="price-range">
                Price Range: ${this.restaurant.price}
              </div>
              <div class="address">Address: ${this.restaurant.location}</div>
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
    return new Promise(resolve => setTimeout(resolve, 500));
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
