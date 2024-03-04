import { APIRequest, JSONRequest } from "./rest";
import * as App from "./app";
import { Profile } from "ts-models";
import { Restaurants } from "ts-models";

const dispatch = App.createDispatch();
export default dispatch.update;

dispatch.addMessage("ProfileSelected", (msg: App.Message) => {
  const { userid } = msg as App.ProfileSelected;

  return new APIRequest()
    .get(`/profiles/${userid}`)
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as Profile;
      }
    })
    .then((profile: Profile | undefined) =>
      profile ? App.updateProps({ profile }) : App.noUpdate
    );
});

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

dispatch.addMessage("RestaurantsLoaded", (msg: App.Message) => {
  const { location } = msg as App.RestaurantsLoaded;
  console.log("IN THE MESSAGE", location);
  return new APIRequest()
    .get(`/restaurants?location=${location}`)
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      } else return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Restaurants:", json);
        return json as Restaurants;
      }
    })
    .then((restaurants: Restaurants | undefined) => {
      restaurants ? App.updateProps({ restaurants }) : App.noUpdate;
    });
});
