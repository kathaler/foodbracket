import { APIRequest, JSONRequest } from "./rest";
import * as App from "./app";
import { Profile } from "ts-models";
import { Restaurant, Restaurants } from "ts-models";

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

dispatch.addMessage("LocationSubmitted", (msg: App.Message) => {
  const { location } = msg as App.LocationSubmitted;
  
  return new APIRequest()
    .get(`/restaurants?location=${location}`)
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      } 
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        return json as Restaurants;
      }
    })
    .then((restaurants: Restaurants | undefined) => 
      restaurants ? App.updateProps({ restaurants }) : App.noUpdate
    );
});

dispatch.addMessage("CardClicked", (msg: App.Message, model: App.Model) => {
  const {restaurant} = msg as App.CardClicked;

  if ((model.selected as Restaurant[]).includes(restaurant)) {
    const selected = model.selected.filter((r) => r !== restaurant);
    return App.updateProps({ selected })(model);
  }

  if (model.selected.length < 8) {
    const selected = [...model.selected, restaurant];
    return App.updateProps({ selected })(model);
  } else {
    console.log("Max of 8 restaurants selected. Can't add more.");
    return App.noUpdate(model);
  }
});

dispatch.addMessage("BracketCompleted", (msg: App.Message, model: App.Model) => {
  const { winner } = msg as App.BracketCompleted;
  console.log("Winner:", winner);
  if (winner) {
    history.pushState({}, '', '/app/bracket/result');
    return App.updateProps({ winner })(model);
  } else {
    return App.noUpdate(model);
  }

});