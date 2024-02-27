import { LitElement, html } from 'lit-element';
import {Route, Router} from '@vaadin/router';
import { property } from 'lit/decorators.js';

export class VaadinRouterElement extends LitElement {
    router = new Router(this);

    @property({ attribute: false })
    routes: Route[] = [];
  
    connectedCallback() {
      super.connectedCallback();
      this.router.setRoutes(this.routes);
      console.log("Router:", this.routes);
    }
  
    render() {
      return html`<slot></slot>`;
    }
}

customElements.define('vaadin-router', VaadinRouterElement);