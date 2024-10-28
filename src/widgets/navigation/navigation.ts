/* Autorin: Lea Koops */
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import componentStyle from './navigation.css?inline';
import { HttpClient, httpClientContext } from '../../../http-client';
import { consume } from '@lit/context';
import { Router, routerContext } from '../../../router';

@customElement('my-navigation')
export class NavigationComponent extends LitElement {
  static styles = componentStyle;

  @consume({ context: httpClientContext })
  httpClient!: HttpClient;

  @consume({ context: routerContext })
  router!: Router;

  @property() firstDropdown: Array<{ linkname: string; link: string }> = [];
  @property() secondDropdown: Array<{ linkname: string; link: string }> = [];
  @property() thirdDropdown: Array<{ linkname: string; link: string }> = [];

  @state() userLoggedIn = false;

  async connectedCallback() {
    super.connectedCallback();
    await this.checkUserLoggedIn();
  }

  async checkUserLoggedIn() {
    const loggedIn = await this.httpClient.isUserLoggedIn();
    this.userLoggedIn = loggedIn;
  }

  render() {
    return html`
      <div class="nav">
        <a href="frontpage" class="apptitle">
          <slot name="logoHome"></slot>
        </a>
        <nav class="navbar">
          <ul>
            ${this.userLoggedIn
              ? html`
                  <li>
                    <a><slot name="first"></slot></a>
                    <ul>
                      ${this.firstDropdown.map(link => html`<li><a href="${link.link}">${link.linkname}</a></li>`)}
                    </ul>
                  </li>
                  <li>
                    <a><slot name="second"></slot></a>
                    <ul>
                      ${this.secondDropdown.map(link => html`<li><a href="${link.link}">${link.linkname}</a></li>`)}
                    </ul>
                  </li>
                `
              : ''}
            <li>
              <a><slot name="third"></slot></a>
              <ul>
                ${this.thirdDropdown.map(link => html`<li><a href="${link.link}">${link.linkname}</a></li>`)}
              </ul>
            </li>
          </ul>
        </nav>
        <div class="toggle-container">
          <my-toggle></my-toggle>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-navigation': NavigationComponent;
  }
}
