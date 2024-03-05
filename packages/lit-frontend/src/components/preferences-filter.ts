import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";

class PreferencesFilter extends LitElement {
  @state() private delivery: boolean = false;
  @state() private priceRange: string = "any";
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
              <option value="low">$</option>
              <option value="medium">$$</option>
              <option value="high">$$$</option>
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
    }
  
    this.dispatchEvent(
      new CustomEvent('filter-updated', {
        detail: {
          delivery: this.delivery,
          priceRange: this.priceRange,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("preferences-filter", PreferencesFilter);
