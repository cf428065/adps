/* Autor: Charlotte Fehlhauer */

import { LitElement, TemplateResult, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
//import componentStyle from './frontpage.css?inline';
//import { HttpClient, httpClientContext } from '../../../http-client.js';
//import { consume } from '@lit/context';

//import { Router, routerContext } from '../../../router';

@customElement('habittracker-frontpage')
export class FrontpageComponent extends LitElement {
  //static styles = componentStyle;


  render() {
    html` <h1 class="app-name">Track & Reflect</h1>
    <h2>Save Fresh Food and Money – <span>Together Against Waste!</span></h2>
    <div class="welcome-message">
      <p>
        Verwalte deine Gewohnheiten und halte deine Gedanken fest mit unserer Anwendung. Erstelle, verwalte und
        lösche deine Gewohnheiten, egal ob täglich, wöchentlich oder in einem individuellen Rhythmus. Verfasse
        persönliche Journal Einträge und nutze den Moodtracker, um deine Gefühle und Erlebnisse festzuhalten.
        Beginne noch heute deine Reise zu einem produktiveren und reflektierteren Leben mit Track & Reflect.
      </p>
      <div class="button" >Jetzt loslegen!</div>
    </div>`;
    }
}
declare global {
  interface HTMLElementTagNameMap {
    'app-frontpage': FrontpageComponent;
  }
}
