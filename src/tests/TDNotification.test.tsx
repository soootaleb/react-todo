// Link.react-test.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TDNotification from '../components/TDNotification';
import { TDActionsTypes, TDNotificationLevel, TDColors } from '../enumerations';
import { INotification } from '../interfaces';

const notification: INotification = {
  content: 'This is a notification'
};

let actions: any[] = [];

test('TDNotification is created with proper notification', () => {
  const onClick = (o) => ({ type: TDActionsTypes.ADD_NOTIFICATION, payload: notification });
  const element = <TDNotification notification={notification} onClick={onClick} />;
  const component: any = ReactDOM.render(element, document.createElement('div'));

  expect(component).toBeTruthy();
  expect(component.props.notification).toBe(notification);
});

test('TDNotification fontColor is adapting', () => {
  const onClick = (o) => ({ type: TDActionsTypes.ADD_NOTIFICATION, payload: notification });

  const component: any = ReactDOM.render((
    <TDNotification
      notification={({ content: 'Always need a content' })}
      onClick={onClick}
    />
  ), document.createElement('div'));

  expect(component.getFontColor(undefined)).toBe(TDColors.WHITE);
  expect(component.getFontColor(TDNotificationLevel.INFO)).toBe(TDColors.WHITE);
  expect(component.getFontColor(TDNotificationLevel.SUCCESS)).toBe(TDColors.BLACK);
  expect(component.getFontColor(TDNotificationLevel.WARNING)).toBe(TDColors.BLACK);
  expect(component.getFontColor(TDNotificationLevel.DANGER)).toBe(TDColors.WHITE);
});

test('TDNotification backgroundColor is adapting', () => {
  const onClick = (o) => ({ type: TDActionsTypes.ADD_NOTIFICATION, payload: notification });

  const component: any = ReactDOM.render((
    <TDNotification
      notification={({ content: 'Always need a content' })}
      onClick={onClick}
    />
  ), document.createElement('div'));

  expect(component.getBackgroundColor(undefined)).toBe(TDColors.PRIMARY);
  expect(component.getBackgroundColor(TDNotificationLevel.INFO)).toBe(TDColors.PRIMARY);
  expect(component.getBackgroundColor(TDNotificationLevel.SUCCESS)).toBe(TDColors.SUCCESS);
  expect(component.getBackgroundColor(TDNotificationLevel.WARNING)).toBe(TDColors.WARNING);
  expect(component.getBackgroundColor(TDNotificationLevel.DANGER)).toBe(TDColors.DANGER);
});

test('TDNotification is calling its onClick property', () => {
  const onClick = (o) => {
    actions.push({ type: TDActionsTypes.ADD_NOTIFICATION, payload: notification });
    return { type: TDActionsTypes.ADD_NOTIFICATION, payload: notification };
  };
  const element = <TDNotification notification={notification} onClick={onClick} />;
  const component: any = ReactDOM.render(element, document.createElement('div'));

  component.props.onClick(notification);

  expect(actions).toEqual([{ type: TDActionsTypes.ADD_NOTIFICATION, payload: notification }]);
});

test('TDNotification header is set if the notification has one', () => {
  const onClick = (o) => {
    actions.push({ type: TDActionsTypes.ADD_NOTIFICATION, payload: notification });
    return { type: TDActionsTypes.ADD_NOTIFICATION, payload: notification };
  };
  const element = (
    <TDNotification
      notification={({
        header: 'MyHeader',
        content: 'Always a content'
      })}
      onClick={onClick}
    />
  );
  const component: any = ReactDOM.render(element, document.createElement('div'));

  expect(component.render().props.children[0]).not.toBeNull();
});

test('TDNotification header is not set if the notification has none', () => {
  const onClick = (o) => {
    actions.push({ type: TDActionsTypes.ADD_NOTIFICATION, payload: notification });
    return { type: TDActionsTypes.ADD_NOTIFICATION, payload: notification };
  };
  const element = (
    <TDNotification
      notification={({
        content: 'Always a content'
      })}
      onClick={onClick}
    />
  );
  const component: any = ReactDOM.render(element, document.createElement('div'));

  expect(component.render().props.children[0]).toBeNull();
});