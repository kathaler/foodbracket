import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";

class PreferencesFilter extends LitElement {
  @state() private delivery: boolean = false;
  @state() private priceRange: string = "any";
  @state() private foodType: string = "any";
  // @state() private reviews: number = -1;
  // @state() private categories: string[] = [];

  render() {
    return html`
      <div class="preferences-filter">
        <form>
          <div class="filter-group">
            <label for="delivery">Delivery:</label>
            <input
              type="checkbox"
              id="delivery"
              name="delivery"
              .checked=${this.delivery}
              @change=${this._handleChange}
            />
          </div>
          <div class="filter-group">
            <label for="price-range">Price Range:</label>
            <select
              id="price-range"
              name="price-range"
              .value=${this.priceRange}
              @change=${this._handleChange}
            >
              <option value="any">Any</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="food-type">Food Type:</label>
            <select
              id="food-type"
              name="food-type"
              .value=${this.foodType}
              @change=${this._handleChange}
            >
              <option value="any">Any</option>
              <option value="american">American</option>
              <option value="mexican">Mexican</option>
              <option value="italian">Italian</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="indian">Indian</option>
              <option value="thai">Thai</option>
              <option value="greek">Greek</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="other">Other</option>
            </select>
          </div>
        </form>
      </div>
    `;
  }

  _handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (name === 'delivery') {
        this.delivery = value as boolean;
    } else if (name === 'price-range') {
        this.priceRange = value.toString();
    } else if (name === 'food-type') {
        this.foodType = value.toString(); 
    }
  
    this.dispatchEvent(
      new CustomEvent('filter-updated', {
        detail: {
          delivery: this.delivery,
          priceRange: this.priceRange,
          foodType: this.foodType,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("preferences-filter", PreferencesFilter);
