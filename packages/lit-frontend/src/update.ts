import { APIRequest, JSONRequest } from "./rest";
import * as App from "./app";
import { Profile } from "ts-models";

const dispatch = App.createDispatch();
export default dispatch.update;

dispatch.addMessage("ProfileSaved", (msg: App.Message) => {
    const { userid, profile } = msg as App.ProfileSaved;
  
    return new JSONRequest(profile)
      .put(`/profiles/${userid}`)
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json();
        }
        return undefined;
      })
      .then((json: unknown) => {
        if (json) {
          console.log("Profile:", json);
          json as Profile;
        }
        return undefined;
      })
      .then((profile: Profile | undefined) =>
        profile ? App.updateProps({ profile }) : App.noUpdate
      );
  });