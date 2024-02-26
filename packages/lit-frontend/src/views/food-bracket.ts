import { LitElement, html } from 'lit';
import '../components/header.ts';
import './main-page.ts';
import { Router } from '@vaadin/router';

export class FoodBracketElement extends LitElement {
    render() {
        return html`
            <header-element></header-element>
            <div id="outlet"></div>
        `;
    }

    firstUpdated() {
        const router = new Router(
            this.shadowRoot?.querySelector('#outlet')
        );
        router.setRoutes([
            { path: '/app', component: 'main-page' },
            { path: '/app/profile/:userid', component: 'user-profile' },
            { path: '(.*)', redirect: '/app/' }
        ]);
    }
}

customElements.define('food-bracket', FoodBracketElement);