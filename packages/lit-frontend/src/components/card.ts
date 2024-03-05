import { html, css, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { Restaurant } from "ts-models";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";
import * as App from "../app";

class Card extends App.View {
  @property({ type: Object }) restaurant?: Restaurant;
  @property({ type: Boolean, reflect: true }) clicked = false;
  @property({ type: Boolean }) canAdd = true;

  render() {
    if (this.restaurant) {
      return html`
      <button @click="${this._handleClick}">
        <div class="card">
        <div class="name">${this.restaurant.name}</div>
            <img class="photo" src="${this.restaurant.photo}" />
            <div class="ratings">
              <span class="rating-icon">⭐</span>
              ${this.restaurant.ratings}
            </div>
            <div class="delivery">Delivery: ${this.restaurant.delivery ? 'Yes' : 'No'}</div>
            <div class="price-range">Price Range: ${this.restaurant.price}</div>
            <div class="address">Address: ${this.restaurant.location}</div>
        </div>
      </button>
    `;
    }
  }

  static styles = [
    unsafeCSS(pageCSS),
    unsafeCSS(resetCSS),
    css`
      .card {
        display: flex;
        flex-direction: column;
        width: 150px;
        padding: 16px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: var(--card-background-color);
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
          rgba(0, 0, 0, 0.23) 0px 6px 6px;
        min-height: 200px;
        min-width: 190px;
        transition: background-color 0.2s;
      }

      .card:hover {
        background-color: var(--card-hover-color);
      }

      :host([clicked]) .card {
        background-color: var(--card-select-color);
      }

      button {
        border: none;
        outline: none;
        background: transparent;
        padding: 0;
        margin: 0;
      }

      .name,
      .ratings,
      .delivery,
      .price-range,
      .food-type {
        color: white;
      }

      .name {
        font-size: 20px;
        font-weight: bold;
        color: white;
        margin-bottom: 8px;
      }

      .photo {
        width: 60%;
        height: 60%;
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

  _handleClick() {
    if (this.canAdd && !this.clicked) {
      this.clicked = !this.clicked;
    } 
    else if (this.clicked) {
      this.clicked = !this.clicked;
    }
    if (this.restaurant) {
      this.dispatchMessage({
        type: "CardClicked",
        restaurant: this.restaurant,
      })
    }
  }
}

customElements.define("card-element", Card);
