import { property } from "lit/decorators.js";
import * as App from "../app";
import { Restaurant } from "ts-models";
import { css, html } from "lit";

export class BracketRenderElement extends App.View {
  @property({ type: Array })
  restaurants: Restaurant[] = [];

  render() {
    return html`
<div class="bracket">
  <div class="round">
    <div class="team">Team 1</div>
    <div class="team">Team 2</div>
    <div class="team">Team 3</div>
    <div class="team">Team 4</div>
  </div>

  <div class="final-round">
    <div class="round">
      <div class="team">Winner 1/2</div>
      <div class="team">Winner 3/4</div>
    </div>
    <div class="final-match">
      <div class="team">Finalist 1</div>
      <div class="team">Finalist 2</div>
    </div>
    <div class="round">
      <div class="team">Winner 5/6</div>
      <div class="team">Winner 7/8</div>
    </div>
  </div>

  <div class="round">
    <div class="team">Team 5</div>
    <div class="team">Team 6</div>
    <div class="team">Team 7</div>
    <div class="team">Team 8</div>
  </div>
</div>
    `;
  }

  static styles = css`
  .bracket {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .round {
    display: flex;
    flex-direction: column;
  }
  .round:not(:last-child) {
    margin-right: 20px;
  }
  .team {
    border: 1px solid #000;
    padding: 10px;
    margin: 5px;
    width: 100px;
    text-align: center;
  }
  .final-round {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .final-match {
    margin: 10px 0;
  }
  `;
}
customElements.define("bracket-render", BracketRenderElement);
