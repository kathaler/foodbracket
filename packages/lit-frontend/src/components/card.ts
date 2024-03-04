import { html, css, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { Restaurant } from "ts-models";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

class Card extends LitElement {
  @property({ type: Object }) restaurant?: Restaurant;

  render() {
    return html`
      <div class="card">
        <slot name="name" class="name"></slot>
        <slot name="photo" class="photo"></slot>
        <slot name="ratings" class="ratings"></slot>
        <slot name="delivery" class="delivery"></slot>
        <slot name="price-range" class="price-range"></slot>
        <slot name="food-type" class="food-type"></slot>
      </div>
    `;
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
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        min-height: 200px;
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
        width: 75%;
        height: 75%;
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

      .food-type {
        font-style: italic;
      }
    `,
  ];
}

customElements.define("card-element", Card);
