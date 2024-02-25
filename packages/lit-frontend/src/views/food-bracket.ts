import { LitElement, html } from 'lit';
import '../components/header.ts';
import './main-page.ts';

export class FoodBracketElement extends LitElement {
    render() {
        return html`
            <header-element></header-element>
            <main-page></main-page>
        `;
    }
}

customElements.define('food-bracket', FoodBracketElement);