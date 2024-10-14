import { LitElement, html, css } from "lit";
import "./user-panel.ts";
import "./drop-down.ts";
import { property, state } from "lit/decorators.js";
import { Profile } from "ts-models";
import { consume } from "@lit/context";
import { authContext } from "./auth-required.ts";
import { APIRequest, APIUser } from "../rest.ts";

export class HeaderElement extends LitElement {
  @state()
  profile?: Profile;

  @consume({ context: authContext, subscribe: true })
  @property({ attribute: false })
  user = new APIUser();

  render() {
    
    const { userid, name, nickname } = this.profile || {};
    const shortname =
      nickname || (name && name.split(" ")[0]) || this.user.username;

    return html`
      <header>
        <div class="header-left">
          <span class="title"><a href="/app">Food Bracket</a></span>

          <nav class="nav-container">
            <a href="your-restaurants.html" class="button boxed"
              >Your Restaurants</a
            >
            <a href="about.html" class="button boxed">About</a>
            <a href="contact.html" class="button boxed">Contact</a>
          </nav>
        </div>
        <!-- <nav class="user-nav-container">
          <p>
            Hello,
            <drop-down align="right">
              ${shortname}
              <user-panel slot="menu" userid=${userid}>
                <span slot="name">${name || userid}</span>
                <a href="app/profile/${userid}">Profile</a>
                <button slot="logout" @click=${this._signOut}>Sign Out</button>
              </user-panel>
            </drop-down>
          </p>
        </nav> -->
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      background-color: var(--secondary-color);
      color: var(--secondary-color);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100000000;
      width: 100%;
      border: 5px solid black;
      box-sizing: border-box;
    }

    p {
      color: black;
    }

    .header-user {
      color: var(--font-color-default);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      padding-right: 20px;
    }

    span {
      color: black;
      font-family: var(--font-family-primary);
      font-size: 1em;
    }

    .title {
      font-size: 2em;
      font-family: var(--font-family-secondary);
      padding-left: 20px;
    }

    a {
      text-decoration: none;
      color: var(--font-color-default);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 40px;
    }

    .header-image {
      width: 10%;
      height: 10%;
      border-radius: 50%;
    }

    .button {
      padding: 8px 12px;
      text-decoration: none;
      color: var(--font-color-default);
      background-color: var(--secondary-color);
      border-radius: 5px; /* Adds rounded corners */
      transition: background-color 0.3s ease; /* Smooth transition for hover effect */
    }

    .button:hover,
    .header-user:hover {
      background-color: var(--primary-color); /* Change color on hover */
    }
  `;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("user")) {
      const { username } = this.user;
      this._getData(`/profiles/${username}`);
    }
    return true;
  }

  _getData(path: string) {
    const request = new APIRequest();

    request
      .get(path)
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        this.profile = json as Profile;
      });
  }

  _signOut() {
    this.user.signOut();
  }
}
customElements.define("header-element", HeaderElement);
