import { css, html, unsafeCSS } from 'lit';
import * as App from '../app';
import { property } from 'lit/decorators.js';

import "../components/user-profile";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

type ProfileLocation = Location & {
    params: {userid: string, edit: string };
    searchParams: Map<string, string>;
} 

export class ProfilePageElement extends App.View {
    @property({ attribute: false })
    location?: ProfileLocation;

    @property({ reflect: true })
    get userid(){
        return this.location?.params.userid;
    } 

    @property({ reflect: true })
    get edit() {
        return this.location?.params.edit;
    }

    @property()
    get profile() {
        return this.getFromModel("profile");
    }

    render() {
        return html`
            <main class="page">
                ${this.edit 
                ? html` <user-profile-edit .using=${this.profile}></user-profile-edit>`
                : html` <user-profile .using=${this.profile}></user-profile>`
            }
            </main>
        `;
    }

    static styles = [
        unsafeCSS(resetCSS),
        unsafeCSS(pageCSS),
        css`
          :host {
            display: contents;
          }
        `
      ];
}
customElements.define('profile-page', ProfilePageElement);