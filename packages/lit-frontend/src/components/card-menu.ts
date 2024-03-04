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
    const rows = (!this.fRestaurants ? this.restaurants : this.fRestaurants) || [];
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

  filterRestaurants(filters: { delivery: boolean; priceRange: string; foodType: string}) {
    const filteredRestaurants = this.restaurants?.filter(restaurant => {
      let matchesDelivery = true;
      let matchesPriceRange = true;

      if (filters.delivery !== false) {
        matchesDelivery = restaurant.delivery === filters.delivery;
      }

      if (filters.priceRange !== 'any') {
        matchesPriceRange = restaurant.priceRange === filters.priceRange;
      }

      if (filters.foodType !== 'any') {
        matchesPriceRange = restaurant.priceRange === filters.priceRange;
      }

      return matchesDelivery && matchesPriceRange;
    });

    this.fRestaurants = filteredRestaurants;
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('location-selected', this.handleLocationSelected.bind(this) as EventListener);
    document.addEventListener('filter-updated', this.handlePreferencesUpdated.bind(this) as EventListener);
  }

  disconnectedCallback() {
    document.removeEventListener('location-selected', this.handleLocationSelected.bind(this) as EventListener);
    document.removeEventListener('filter-updated', this.handlePreferencesUpdated.bind(this) as EventListener);
    super.disconnectedCallback();
  }

  handleLocationSelected(event: CustomEvent) {
    // TODO - fetch data based on location
    const {location} = event.detail;
    if (this.src) {
      this._fetchData(this.src);
    }
    this.filterRestaurants({delivery: false, priceRange: 'any', foodType: 'any'});
  }

  handlePreferencesUpdated(event: CustomEvent) {
    const {delivery, priceRange, foodType} = event.detail;
    this.filterRestaurants({delivery, priceRange, foodType});
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
