import { LitElement, html } from 'lit';
import '../components/header.ts';
import './main-page.ts';
import '../components/vaadin-router.ts';
// MVU
import * as App from "../app";
import routes from "../routes";
import update from "../update";

export class FoodBracketElement extends App.Main {
    constructor() {
        super(update);
    }
    
    render() {
        return html`
            <header-element></header-element>
            <vaadin-router .routes=${routes}> </vaadin-router>
        `;
    }
}

customElements.define('food-bracket', FoodBracketElement);