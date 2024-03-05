import { html, css, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { Restaurant, Restaurants } from "ts-models";
import "./card.ts";
import * as App from "../app";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

class CardMenu extends App.View {
  @property()
  src: string = "";

  @state()
  restaurants?: Restaurant[];
  fRestaurants?: Restaurant[];

  @property()
  get yelp_restaurants() {
    return this.getFromModel("restaurants") as Restaurants;
  }

  render() {
    let rows = Array.isArray(this.yelp_restaurants.restaurants) 
    ? this.yelp_restaurants.restaurants : [];

    if (this.fRestaurants) {
      rows = this.fRestaurants;
    }

    if (rows.length === 0) {
      return html`<div>Loading...</div>`;
    }
    return html`
      <div class="restaurant-cards">
        ${(rows).map((restaurant: Restaurant) => html`
          <card-element>
            <div slot="name">${restaurant.name}</div>
            <img slot="photo" class="photo" src="${restaurant.photo}" />
            <div slot="ratings">
              <span class="rating-icon">⭐</span>
              ${restaurant.ratings}
            </div>
            <div slot="delivery">Delivery: ${restaurant.delivery ? 'Yes' : 'No'}</div>
            <div slot="price-range">Price Range: ${restaurant.price}</div>
          </card-element>
        `)}
      </div>
    `;
  }

  static styles = [
  unsafeCSS(pageCSS),
  unsafeCSS(resetCSS),
  css`
    .restaurant-cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      overflow: auto;
      height: 80vh;
      gap: 16px;
    }
  `];

  filterRestaurants(filters: { delivery: boolean; priceRange: string;}) {
    let newRestaurants = Array.isArray(this.yelp_restaurants.restaurants) ?
     this.yelp_restaurants.restaurants : [];
    const filteredRestaurants = newRestaurants?.filter(restaurant => {
      let matchesDelivery = true;
      let matchesPriceRange = true;

      if (filters.delivery !== false) {
        matchesDelivery = restaurant.delivery === filters.delivery;
      }

      if (filters.priceRange !== 'any') {
        matchesPriceRange = restaurant.price === filters.priceRange;
      }

      return matchesDelivery && matchesPriceRange;
    });

    this.fRestaurants = filteredRestaurants;
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('filter-updated', this.handlePreferencesUpdated.bind(this) as EventListener);
  }

  disconnectedCallback() {
    document.removeEventListener('filter-updated', this.handlePreferencesUpdated.bind(this) as EventListener);
    super.disconnectedCallback();
  }

  handlePreferencesUpdated(event: CustomEvent) {
    const {delivery, priceRange} = event.detail;
    this.filterRestaurants({delivery, priceRange});
  }
}

customElements.define("card-menu", CardMenu);
