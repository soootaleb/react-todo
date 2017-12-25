// Link.react-test.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TDButton from './components/TDButton';

test('TDButton', () => {
  let arr = ['Hello'];

  const onClick = () => arr.push('World');
  const button = <TDButton label="MyButton" onClick={onClick} />;
  const component: any = ReactDOM.render(button, document.createElement('div'));

  expect(component).toBeTruthy();
  expect(component.props.label).toBe('MyButton');
  expect(component.state.hover).toBe(false);
  
  component.props.onClick();

  expect(arr).toEqual(['Hello', 'World']);
  
  component.mouseOver();
  expect(component.state.hover).toBe(true);
  
  component.mouseOut();
  expect(component.state.hover).toBe(false);
});