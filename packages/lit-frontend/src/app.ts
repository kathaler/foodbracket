import { property, state } from "lit/decorators.js";
import { consume, createContext, provide } from "@lit/context";
import { Profile, Restaurants } from "ts-models";
import * as MVU from "./mvu";
import { MsgType } from "./mvu";
import { TestUser, EmptyRestaurants } from "./rest";


export interface Model {
  user: TestUser;
  profile?: Profile;
  restaurants?: Restaurants;
}

export const context = createContext<Model>("FoodBracketModel");

export const init: Model = {
  user: new TestUser(),
  restaurants: new EmptyRestaurants(),
};

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

export type Message = ProfileSaved | ProfileSelected | LocationSubmitted;

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
