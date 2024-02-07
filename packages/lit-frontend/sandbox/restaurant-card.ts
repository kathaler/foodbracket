import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Restaurant } from "../src/models/restaurant";

class RestaurantCard extends LitElement {

  @property()
  src: string = "";

  @state()
  restaurants?: Restaurant[];

  render() {
    const rows = this.restaurants || [];

    const renderRow = (row: Restaurant) => {
        const { name, photo, ratings, delivery, pricerange, foodType } = row;

        return html`
        <div class="card">
          <div class="name">${name}</div>
          <img class="photo" src="${photo}" alt="Restaurant Photo" />
          <div class="ratings">
            <span class="rating-icon">⭐</span>
            ${ratings}
          </div>
          <div class="delivery">Delivery: ${delivery ? "Yes" : "No"}</div>
          <div class="price-range">Price Range: ${pricerange}</div>
          <div class="food-type">Food Type: ${foodType}</div>
        </div>
      `;
    };

    return html`<div class="restaurant-cards">${Array.isArray(rows) ? rows.map(renderRow) : ''}</div>`;
  }

  static styles = css`
    .restaurant-cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        overflow: auto;
        height: 100%;
        gap: 16px;
    }

    .card {
      display: flex;
      flex-direction: column;
      width: 150px;
      padding: 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    .name {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .photo {
      width: 100%;
      height: 200px;
      object-fit: cover;
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

  connectedCallback() {
    if (this.src) {
      this._fetchData(this.src);
    }
    super.connectedCallback();
  }

  _fetchData(src: string) {
    fetch(src)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((data) => {
        if (data && Array.isArray(data.restaurants)) {
          this.restaurants = data.restaurants;
        } else {
          throw new Error('Data format is incorrect');
        }
      })
  }
}

customElements.define("restaurant-card", RestaurantCard);
