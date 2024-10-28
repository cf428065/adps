/*Autor: Charlotte Fehlhauer*/
import { expect } from 'chai';
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import sinon from 'sinon';
import './notification-stack';
import { NotificationStackComponent } from './notification-stack';

describe('NotificationStackComponent', () => {
  let element: NotificationStackComponent;

  beforeEach(async () => {
    element = await fixture<NotificationStackComponent>(html`<notification-stack></notification-stack>`);
  });

  it('should be defined', () => {
    expect(element).to.be.instanceOf(NotificationStackComponent);
  });

  it('should render an empty stack by default', () => {
    expect(element.shadowRoot!.querySelectorAll('.notification')).to.have.length(0);
  });

  it('should add a notification to the stack', () => {
    element.createNotification('success', 'Test message');
    expect(element.stack).to.have.length(1);
    expect(element.stack[0]).to.include({ type: 'success', message: 'Test message' });
  });

  it('should remove a notification from the stack', () => {
    element.createNotification('error', 'Error message');
    const id = element.stack[0].id;
    element.closeNotification(id)();
    expect(element.stack).to.have.length(0);
  });

  it('should schedule a notification to be removed after 10 seconds', () => {
    const clock = sinon.useFakeTimers();
    element.createNotification('success', 'Test message');
    const id = element.stack[0].id;
    const spy = sinon.spy(element, 'closeNotification');

    clock.tick(10000);
    expect(spy.calledWith(id)).to.be.true;

    spy.restore();
    clock.restore();
  });

  it('should render notifications in the stack', async () => {
    element.createNotification('success', 'Test message 1');
    element.createNotification('error', 'Test message 2');
    await element.updateComplete;

    const notifications = element.shadowRoot!.querySelectorAll('.notification');
    expect(notifications).to.have.length(2);

    const successNotification = notifications[0].querySelector('.content p')!.textContent;
    const errorNotification = notifications[1].querySelector('.content p')!.textContent;

    expect(successNotification).to.equal('Test message 1');
    expect(errorNotification).to.equal('Test message 2');
  });
});
