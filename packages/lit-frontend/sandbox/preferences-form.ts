import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";

class PreferencesForm extends LitElement {
  @state() private location: string = "";
  @state() private delivery: boolean = false;
  @state() private priceRange: string = "any";

  static styles = css`
    #location-prompt {
      display: grid;
      gap: 20px;
    }

    .preferencesForm {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      margin: 30px auto;
      text-align: left;
    }
  `;

  render() {
    return html`
      <form class="preferencesForm" @submit=${this._handleSubmit}>
        <div id="location-prompt">
          <label for="location">Enter Your Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            .value=${this.location}
            @input=${(e: { target: { value: string } }) =>
              (this.location = e.target.value)}
            required
            placeholder="Zip code or City"
          />
        </div>

        <label for="delivery">Offers Delivery:</label>
        <input
          type="checkbox"
          id="delivery"
          name="delivery"
          .checked=${this.delivery}
          @change=${(e: { target: { checked: boolean } }) =>
            (this.delivery = e.target.checked)}
        />

        <label for="priceRange">Price Range:</label>
        <select
          id="priceRange"
          name="priceRange"
          .value=${this.priceRange}
          @change=${(e: { target: { value: string } }) =>
            (this.priceRange = e.target.value)}
        >
          <option value="any">Any</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>

        <input type="submit" value="Save Preferences" />
      </form>
    `;
  }

  _handleSubmit(event: Event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("preferences-updated", {
        detail: {
          location: this.location,
          delivery: this.delivery,
          priceRange: this.priceRange,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("preferences-form", PreferencesForm);