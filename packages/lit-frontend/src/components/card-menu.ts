import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Restaurant } from "ts-models";
import "./card.ts";

class CardMenu extends LitElement {
  @property()
  src: string = "";

  @state()
  restaurants?: Restaurant[];
  fRestaurants?: Restaurant[];

  render() {
    const rows = this.fRestaurants || [];
    return html`
      <div class="restaurant-cards">
        ${rows.map(restaurant => html`
          <card-element>
            <div slot="name">${restaurant.name}</div>
            <img slot="photo" class="photo" src="${restaurant.photo}" />
            <div slot="ratings">
              <span class="rating-icon">⭐</span>
              ${restaurant.ratings}
            </div>
            <div slot="delivery">Delivery: ${restaurant.delivery ? 'Yes' : 'No'}</div>
            <div slot="price-range">Price Range: ${restaurant.priceRange}</div>
            <div slot="food-type">Food Type: ${restaurant.foodType}</div>
          </card-element>
        `)}
      </div>
    `;
  }

  static styles = css`
    .restaurant-cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      overflow: auto;
      height: 80vh;
      gap: 16px;
    }
  `;

  filterRestaurants(filters: { delivery: boolean; priceRange: string; }) {
    const filteredRestaurants = this.restaurants?.filter(restaurant => {
      let matchesDelivery = true;
      let matchesPriceRange = true;

      if (filters.delivery) {
        matchesDelivery = restaurant.delivery === filters.delivery;
      }

      if (filters.priceRange !== 'any') {
        matchesPriceRange = restaurant.priceRange === filters.priceRange;
      }

      return matchesDelivery && matchesPriceRange;
    });

    this.fRestaurants = filteredRestaurants;
    this.requestUpdate();
  }

  connectedCallback() {
    if (this.src) {
      this._fetchData(this.src);
    }
    super.connectedCallback();
    document.addEventListener('preferences-updated', this.handlePreferencesUpdated.bind(this) as EventListener);
  }

  disconnectedCallback() {
    document.removeEventListener('preferences-updated', this.handlePreferencesUpdated.bind(this) as EventListener);
    super.disconnectedCallback();
  }

  handlePreferencesUpdated(event: CustomEvent) {
    const {delivery, priceRange} = event.detail;
    this.filterRestaurants({delivery, priceRange});
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
          throw new Error("Data format is incorrect");
        }
      });
  }
}

customElements.define("card-menu", CardMenu);
