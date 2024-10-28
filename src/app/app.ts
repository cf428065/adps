/* Autor: Prof. Dr. Norman Lahme-Hütig (FH Münster) */

import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { Router, routerContext } from '../router.js';
import componentStyle from './app.css?inline';
import { HttpClient, httpClientContext } from '../http-client.js';
import config from '../../config.json' assert { type: 'json' };
import { provide } from '@lit/context';
import { NotificationStackComponent } from '../widgets/notification-stack/notification-stack.js';
import { NavigationComponent } from '../widgets/navigation/navigation.js';

const APP_TITLE = 'Track & Reflect';

@customElement('app-root')
export class AppComponent extends LitElement {
  static styles = [componentStyle];

  /* Autor: Charlotte Fehlhauer*/
  @provide({ context: httpClientContext })
  httpClient = new HttpClient();

  @provide({ context: routerContext })
  router = new Router(this, [
    { path: '/', render: () => html`<habittracker-frontpage></habittracker-frontpage>` },
    { path: '/frontpage', render: () => html`<habittracker-frontpage></habittracker-frontpage>` },
   
    { path: '/sign-up', render: () => html`<app-sign-up></app-sign-up>` },
    { path: '/sign-in', render: () => html`<app-sign-in></app-sign-in>` },
    { path: '/sign-out', render: () => html`<app-sign-out></app-sign-out>` }
  ]);

  @state() title = APP_TITLE;

  /*Autor: Lea Koops*/
  @state() habitLinks: Array<{ linkname: string; link: string }> = [];
  @state() journalLinks: Array<{ linkname: string; link: string }> = [];
  @state() profilLinks: Array<{ linkname: string; link: string }> = [];

  @query('my-navigation') navigation!: NavigationComponent;
  /*Ende Autor: Lea Koops*/
  @query('notification-stack') notificationStack!: NotificationStackComponent;

  constructor() {
    super();
    this.httpClient.init(`${config.protocol}://${location.hostname}:3000`);
    /*Autor: Lea Koops*/

    this.habitLinks = [
      { linkname: 'All Habits', link: '/all-habits' },
      { linkname: 'Create Habit', link: '/my-create-habit' },
      { linkname: 'Suggestions', link: '/suggestion' }
    ];

    this.journalLinks = [
      { linkname: 'Journal', link: '/journal' },
      { linkname: 'Create Entry', link: '/journal/create-entry' }
    ];

    this.profilLinks = [
      { linkname: 'Sign-In', link: '/sign-in' },
      { linkname: 'Sign-Up', link: '/sign-up' },
      { linkname: 'Sign-Out', link: '/sign-out' }
    ];
  }
  /*Autor: Lea Koops*/
  async conCallback() {
    super.connectedCallback();
    await this.updateNavigation();
  }
  async updateNavigation() {
    if (this.navigation) {
      await this.navigation.checkUserLoggedIn();
    }
  }
  /*Autor Charlotte Fehlhaeur
  async connectedCallback() {
    super.connectedCallback();
    try {
      await this.httpClient.get('users/sign-in');
    } catch (e) {
      this.router.push('/sign-in');
    }
  }*/

  render() {
    return html`
      <nav>
        <my-navigation
          apptitle="${this.title}"
          .firstDropdown=${this.habitLinks}
          .secondDropdown=${this.journalLinks}
          .thirdDropdown=${this.profilLinks}
        >
          <img slot="logoHome" src="./logohabit.png" />
          <li slot="first">Habits</li>
          <li slot="second">Journal</li>
          <li slot="third">Profil</li>
        </my-navigation>
      </nav>
      <notification-stack id="notifications"></notification-stack>
      <main>${this.router.outlet()}</main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppComponent;
  }
}
