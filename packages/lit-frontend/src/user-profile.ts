import { LitElement, html, css, render } from "lit";
import { Profile } from "../src/models/profile";
import { property, state } from "lit/decorators.js";
import { serverPath } from "./rest";

export class UserProfileElement extends LitElement {
  @property()
  path: string = "";

  @state()
  profile?: Profile;

  connectedCallback() {
    if (this.path) {
      console.log("fetching data");
      this._fetchData(this.path);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "path" && oldValue !== newValue && oldValue) {
      this._fetchData(newValue);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  static styles = css`
    h1 {
      font-size: 1.5em;

    }
  `;

  render() {
    const { userid, name, nickname, zip, city, restaurants } = (this.profile ||
      {}) as Profile;
    return html`
      <section>
        <a href="./${userid}/edit">Edit</a>
        <h1>${name}</h1>
        <dl>
          <dt>Username</dt>
          <dd>${userid}</dd>
          <dt>Nickname</dt>
          <dd>${nickname}</dd>
          <dt>Zip</dt>
          <dd>${zip}</dd>
          <dt>Home City</dt>
          <dd>${city}</dd>
        </dl>
      </section>
    `;
  }

  _fetchData(path: string) {
    fetch(serverPath(path))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        if (json) this.profile = json as Profile;
      });
  }
}

export class UserProfileEditElement extends UserProfileElement {
  render() {
    const profile = (this.profile || {}) as Profile;
    const {userid, name, nickname, zip, city, restaurants} = profile;

    console.log("Rendering form", this.profile);
    return html`
      <section>
        <form @submit=${this._handleSubmit}>
          <dl>
            <dt>Username</dt>
            <dd
              ><input name="userid" disabled .value=${userid}
            /></dd>
            <dt>Name</dt>
            <dd><input name="name" .value=${name} /></dd>
            <dt>Nickname</dt>
            <dd
              ><input name="nickname" .value=${nickname}
            /></dd>
            <dt>Zip Code</dt>
            <dd><input name="zip" .value=${zip} /></dd>
            <dt>Home City</dt>
            <dd><input name="city" .value=${city} /></dd>
          </dl>
          <button type="submit">Submit</button>
        </form>
      </section>
    `;
  }

  _handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const entries = formData.entries();
    const json = Object.fromEntries(entries);
    this._putData(json);
  }

  _putData(data: unknown) {
    fetch(serverPath(this.path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status === 200) return response.json();
    }).then((json : unknown) => {
      if (json) this.profile = json as Profile;
    }).catch((err) => {
      console.log("Failed to PUT form data", err)
    });
  }
}

customElements.define("user-profile", UserProfileElement);
customElements.define("user-profile-edit", UserProfileEditElement);
