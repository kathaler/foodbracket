import { LitElement, html, css } from "lit";
import "./user-panel.ts";
import "./drop-down.ts";

export class HeaderElement extends LitElement {
  render() {
    return html`
      <header>
        <div class="header-left">
          <span><a href="/app">Food Bracket</a></span>
          
          <nav class="nav-container">
            <a href="your-restaurants.html" class="button boxed"
              >Your Restaurants</a
            >
            <a href="about.html" class="button boxed">About</a>
            <a href="contact.html" class="button boxed">Contact</a>
          </nav>
        </div>
        <nav class="user-nav-container">
            <drop-down align="right">
                <div class="header-user">
                    <img class="header-image" src="/images/firestone.jpeg" />
                    Hello, User
                </div>
              <user-panel slot="menu" avatar="/images/firestone.jpeg">
                <span slot="name">Test User</span>
              </user-panel>
            </drop-down>
        </nav>
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

    .header-user {
      color: var(--font-color-default);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px; 
      padding-right: 20px;
    }

    span {
      color: var(--font-color-default);
      font-family: var(--font-family-secondary);
      font-size: 2em;
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
}
customElements.define("header-element", HeaderElement);
