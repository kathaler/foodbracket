import { html, css } from "lit";
import { Profile } from "ts-models";
import { property } from "lit/decorators.js";
import * as App from '../app.ts';

export class UserProfileElement extends App.View {
  @property({ attribute: false})
  using?: Profile;

  get profile() {
    console.log("GETTING PROFILE", this.using);
    return this.using || ({} as Profile);
  }

  static styles = css`
    section {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background-color: var(--tertiary-color);
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    a {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      padding: 8px 12px;
      margin-bottom: 20px;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      background-color: #0056b3;
    }

    h1 {
      color: var(--font-color-default);
      font-size: 24px;
      margin-bottom: 15px;
    }

    dl {
      background-color: var(--tertiary-color);
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 5px;
    }

    dt {
      font-weight: bold;
      color: var(--font-color-default);
    }

    dd {
      margin-bottom: 10px;
      margin-left: 20px;
      color: var(--font-color-secondary);
    }

    dd:last-child {
      margin-bottom: 0;
    }

    dt,
    dd {
      display: inline-block; /* Make dt and dd inline-block */
      margin: 0; /* Remove default margins */
    }

    /* New style for flexbox layout */
    .profile-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .profile-item dt {
      flex-basis: 100%; /* Adjust the width of dt */
    }

    .profile-item dd {
      flex-basis: 100%; /* Adjust the width of dd */
      margin-left: 0; /* Reset margin-left */
    }
  `;

  render() {
    const { userid, name, nickname, zip, city } = (this.profile ||
      {}) as Profile;
    return html`
      <section>
        <a href="?edit=t">Edit</a>
        <h1>${name}</h1>
        <dl>
          <div class="profile-item">
            <dt>Username</dt>
            <dd>${userid}</dd>
          </div>
          <div class="profile-item">
            <dt>Nickname</dt>
            <dd>${nickname}</dd>
          </div>
          <div class="profile-item">
            <dt>Zip</dt>
            <dd>${zip}</dd>
          </div>
          <div class="profile-item">
            <dt>Home City</dt>
            <dd>${city}</dd>
          </div>
        </dl>
      </section>
    `;
  }
}

export class UserProfileEditElement extends UserProfileElement {
  render() {
    const profile = (this.profile || {}) as Profile;
    const { userid, name, nickname, zip, city } = profile;

    console.log("Rendering form", this.profile);
    return html`
      <section>
        <form @submit=${this._handleSubmit}>
          <dl>
            <dt>Username</dt>
            <dd><input name="userid" disabled .value=${userid} /></dd>
            <dt>Name</dt>
            <dd><input name="name" .value=${name} /></dd>
            <dt>Nickname</dt>
            <dd><input name="nickname" .value=${nickname ?? ""} /></dd>
            <dt>Zip Code</dt>
            <dd><input name="zip" .value=${zip ?? ""} /></dd>
            <dt>Home City</dt>
            <dd><input name="city" .value=${city ?? ""} /></dd>
          </dl>
          <button type="submit">Submit</button>
        </form>
      </section>
    `;
  }

  static styles = css`
    section {
      display: block;
    }

    form {
      display: block;
    }

    dt {
      font-weight: bold;
      color: var(--font-color-default);
    }

    dd {
      margin-bottom: 10px;
      margin-left: 20px;
      color: var(--font-color-secondary);
    }
  `;

  _handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const entries = formData.entries();
    const json = Object.fromEntries(entries);
    console.log("Form data", json);
    this._putData(json);
  }

  _putData(data: unknown) {
    const msg = {
      type: "ProfileSaved",
      userid: this.profile?.userid,
      profile: data as Profile,
    }
    const ev = new CustomEvent("mvu:message", {
      bubbles: true,
      composed: true,
      detail: msg,
    })
    this.dispatchEvent(ev);

    // fetch(serverPath(this.path), {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     if (response.status === 200) return response.json();
    //   })
    //   .then((json: unknown) => {
    //     if (json) this.profile = json as Profile;
    //   })
    //   .catch((err) => {
    //     console.log("Failed to PUT form data", err);
    //   });
  }
}

customElements.define("user-profile", UserProfileElement);
customElements.define("user-profile-edit", UserProfileEditElement);
