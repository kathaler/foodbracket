import { LitElement, html, css } from "lit";

export class HeaderElement extends LitElement {
  render() {
    return html`
    <header>
      <div class="header-left">
        <div class="title-container">
          <h1>Food Bracket</h1>
        </div>
        <nav class="nav-container">
          <a href="your-restaurants.html" class="button boxed">Your Restaurants</a>
          <a href="about.html" class="button boxed">About</a>
          <a href="contact.html" class="button boxed">Contact</a>
        </nav>
      </div>
      <nav class="user-nav-container">
        <p>
          <drop-down align="right">
            <img class="header-image" src="/images/firestone.jpeg" />
            Hello, User
            <user-panel
              slot="menu"
              avatar="/images/firestone.jpeg">
              <span slot="name">Test User</span>
            </user-panel>
          </drop-down>
        </p>
      </nav>
    </header>
    `;
  }

  static styles = css`
    header {
      background-color: #f0f0f0;
      padding: 10px;
      margin-bottom: 10px;
    }
  `;
}
customElements.define("header-element", HeaderElement);
