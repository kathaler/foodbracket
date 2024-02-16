import { LitElement, html } from "lit";
import { Profile } from "../src/models/profile";
import { property, state } from "lit/decorators.js";

class UserProfileElement extends LitElement {
    @property()
    path: string = "";

    @state()
    profile?: Profile;
    
    render() {
        const {userid, name, nickname, zip, city, restaurants} = (this.profile || {}) as Profile;
        return html `
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
customElements.define("user-profile", UserProfileElement);