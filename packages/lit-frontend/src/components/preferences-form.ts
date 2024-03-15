import { html, css } from "lit";
import { state } from "lit/decorators.js";
import "./preferences-filter";
import * as App from "../app";

class PreferencesForm extends App.View {
  @state() private location: string = "";
  @state() private submitted: boolean = false;

  static styles = css`
    #location-prompt {
      display: grid;
      gap: 20px;
    }

    .locationForm {
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
    <div class="preferencesForm">
    ${this.submitted 
      ? html`
          <h1>${this.location}</h1>
          <preferences-filter></preferences-filter>
      `
      : html`
          <form class="locationForm" 
          @submit=${this._handleSubmit}>
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
            <input type="submit" value="Find Restaurants" />
          </form>
    `}
     </div>`;
  }

  _handleSubmit(event: Event) {
    event.preventDefault();
    this.submitted = true;

    this.dispatchMessage({      
      type: "LocationSubmitted",
      location: this.location
    })
  }
}

customElements.define("preferences-form", PreferencesForm);