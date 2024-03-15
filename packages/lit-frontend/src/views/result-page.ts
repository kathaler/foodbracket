import { property } from 'lit/decorators.js';
import * as App from '../app';
import { html } from 'lit';
import { Restaurant } from 'ts-models';

export class ResultPageElement extends App.View {
    @property({ reflect: true })
    get winner() {
        return this.getFromModel('winner') as Restaurant;
    }

    render() {
        console.log(this.winner);
        return html`
            <div class="container">
                <h2>Winner</h2>
                <p>${this.winner?.name}</p>
            </div>
        `;
    }
}
customElements.define('result-page', ResultPageElement);