/*Autor: Charlotte Fehlhauer*/
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import componentStyle from './notification-stack.css?inline';

interface Notification {
  id: number;
  type: 'error' | 'success';
  message: string;
}
@customElement('notification-stack')
export class NotificationStackComponent extends LitElement {
  static styles = [componentStyle];

  @property() stack: Notification[] = [];
  @state() nextId = 0;

  render() {
    return html`<div class="notification-stack">
      ${this.stack.map(
        notification =>
          html` <div class="notification">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="black"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
              @click="${this.closeNotification(notification.id)}"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
              />
            </svg>
            <div class="content">
              ${this.setType(notification.type)}
              <p>${notification.message}</p>
            </div>
          </div>`
      )}
    </div>`;
  }

  setType(type: 'error' | 'success') {
    if (type === 'error') {
      return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-exclamation-circle-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
        />
      </svg>`;
    } else {
      return html` <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        class="bi bi-check-circle-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </svg>`;
    }
  }

  createNotification(type: 'error' | 'success', message: string) {
    const notification = { id: this.nextId++, type, message };
    this.stack.push(notification);
    this.scheduleRemoveNotification(notification.id);
  }

  scheduleRemoveNotification(id: number) {
    setTimeout(() => {
      this.closeNotification(id)();
    }, 10000);
  }

  closeNotification(id: number) {
    return () => {
      this.stack = this.stack.filter(notification => notification.id !== id);
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'notification-stack': NotificationStackComponent;
  }
}
