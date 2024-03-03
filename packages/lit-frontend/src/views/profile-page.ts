import { css, html, unsafeCSS } from 'lit';
import * as App from '../app';
import { property } from 'lit/decorators.js';

import "../components/user-profile";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

type ProfileLocation = Location & {
    params: { userid: string };
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
    get edit(): boolean {
      if (this.location) {
        const params = new URL(document.location.toString())
          .searchParams;
        return params.has("edit");
      }
      return false;
    }

    @property()
    get profile() {
        return this.getFromModel("profile");
        // const request = new APIRequest();
        // return request.get(`/profiles/${this.userid}`) as unknown as Promise<Profile>;
    }

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
      ) {
        if (
          name === "userid" &&
          oldValue !== newValue &&
          newValue
        ) {
          console.log("Profile Page:", newValue);
          this.dispatchMessage({
            type: "ProfileSelected",
            userid: newValue
          });
        }
        super.attributeChangedCallback(name, oldValue, newValue);
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