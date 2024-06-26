import { property, state } from "lit/decorators.js";
import { consume, createContext, provide } from "@lit/context";
import { Profile, Restaurants, Restaurant } from "ts-models";
import * as MVU from "./mvu";
import { MsgType } from "./mvu";
import { EmptyRestaurants, APIUser, AuthenticatedUser } from "./rest";


export interface Model {
  user: APIUser;
  profile?: Profile;
  restaurants: Restaurants;
  selected: Restaurant[];
  winner?: Restaurant;
}

export const context = createContext<Model>("FoodBracketModel");

export const init: Model = {
  user: new APIUser(),
  restaurants: new EmptyRestaurants(),
  selected: []
};

export interface UserLoggedIn extends MsgType<"UserLoggedIn"> {
  user: AuthenticatedUser;
}

export interface ProfileSelected extends MsgType<"ProfileSelected"> {
  userid: string;
}

export interface ProfileSaved extends MsgType<"ProfileSaved"> {
  userid: string
  profile: Profile;
}

export interface LocationSubmitted extends MsgType<"LocationSubmitted"> {
  location: string;
}

export interface CardClicked extends MsgType<"CardClicked"> {
  restaurant: Restaurant;
}

export interface BracketCompleted extends MsgType<"BracketCompleted"> {
  winner: Restaurant;
}

export interface NewProfile extends MsgType<"NewProfile"> {
  userid: string;
}

export interface ClearRestaurantFields extends MsgType<"ClearRestaurantFields"> {}


export type Message = ClearRestaurantFields | UserLoggedIn | ProfileSaved | ProfileSelected | LocationSubmitted | CardClicked | BracketCompleted | NewProfile;

export class Main
  extends MVU.Main<Model, Message>
  implements MVU.App<Model, Message>
{
  @provide({ context })
  @state()
  model = init;
  constructor(update: MVU.Update<Model, Message>) {
    super(
      update,
      () => this.model,
      (next: Model) => (this.model = next)
    );
  }
}

export class View extends MVU.View<Message> {
  @consume({ context: context, subscribe: true })
  @property({ attribute: false })
  _model: Model | undefined;

  getFromModel<T>(key: keyof Model) {
    if (this._model) {
      return this._model[key] as T;
    }
  }
}

export const createDispatch = () => new MVU.Dispatch<Model, Message>();

export const updateProps = MVU.updateProps<Model>;

export const noUpdate = MVU.noUpdate<Model>;
