import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Restaurant } from '../models/restaurant';

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

  static styles = css`
  .card {
    display: flex;
    flex-direction: column;
    width: 150px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: var(--card-background-color-dark);
    min-height: 200px;
  }

  .name, .ratings, .delivery, .price-range, .food-type {
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
`;
}

customElements.define('card-element', Card);
