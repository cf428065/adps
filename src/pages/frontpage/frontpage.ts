/* Autor: Charlotte Fehlhauer */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import componentStyle from './frontpage.css?inline';
//import { HttpClient, httpClientContext } from '../../http-client.js';
//import { consume } from '@lit/context';

//import { Router, routerContext } from '../../../router';

@customElement('habittracker-frontpage')
export class FrontpageComponent extends LitElement {
  static styles = componentStyle;


  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    html` <h1 class="app-name">To Good To Go </h1>
    <h2>Save Fresh Food and Money – <span>Together Against Waste!</span></h2>
    <div class="welcome-message">
      <p>
      Discover local restaurants, bakeries, and stores offering surplus food at discounted prices. 
      With our app, you can rescue perfectly good meals that would otherwise go to waste, while saving 
      money and supporting sustainable practices. Simply browse available offers, 
      reserve your meal, and pick it up at the designated time. 
      
      Help reduce food waste, enjoy great food
      and make a positive impact on the environment!
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
