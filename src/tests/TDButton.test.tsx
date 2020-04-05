// Link.react-test.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TDButton from '../components/TDButton';
import { TDColors } from '../enumerations';

test('TDButton is created with proper label & state', () => {
  const button = <TDButton label="MyButton" onClick={null} />;
  const component: any = ReactDOM.render(button, document.createElement('div'));

  expect(component).toBeTruthy();
  expect(component.props.label).toBe('MyButton');
  expect(component.state.hover).toBe(false);
});

test('TDButton is calling its onClick property', () => {
  let arr = ['Hello'];

  const onClick = () => arr.push('World');
  const button = <TDButton label="MyButton" onClick={onClick} />;
  const component: any = ReactDOM.render(button, document.createElement('div'));
  
  component.props.onClick();

  expect(arr).toEqual(['Hello', 'World']);
});

test('TDButton is reacting to mouseOver & mouseOut()', () => {
  const button = <TDButton label="MyButton" onClick={null} />;
  const component: any = ReactDOM.render(button, document.createElement('div'));
  
  component.mouseOver();
  expect(component.state.hover).toBe(true);
  expect(component.style(component).backgroundColor).toBe(TDColors.MINOR);
  
  component.mouseOut();
  expect(component.state.hover).toBe(false);
  expect(component.style(component).backgroundColor).toBe(TDColors.CATCHY);
});