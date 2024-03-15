import { property } from "lit/decorators.js";
import * as App from "../app";
import { Restaurant } from "ts-models";
import { html } from "lit";

export class MatchElement extends App.View {
    @property()
    match: Restaurant[] = [];

    render() {
        return html`
        <div class="match">
            <restaurant-panel .restaurant=${this.match[0]} side="left"></restaurant-panel>
            <restaurant-panel .restaurant=${this.match[1]} side="right"></restaurant-panel>
        </div>
        `;
    }

    
}
customElements.define("match-element", MatchElement);