// Link.react-test.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TDElement from '../components/TDElement';
import { TDActionsTypes, TDTodoCategory } from '../enumerations';

const todo = {
  label: 'MyTodo',
  category: TDTodoCategory.TODO
};

let actions: any[] = [];

test('TDElement is created with proper todo', () => {
  const element = <TDElement todo={todo} onCompleteClicked={(o) => ({type: TDActionsTypes.ADD_TODO, payload: todo})} />;
  const component: any = ReactDOM.render(element, document.createElement('div'));

  expect(component).toBeTruthy();
  expect(component.props.todo).toBe(todo);
});

test('TDElement is calling its onCompleteClicked property', () => {
  const onCompleteClicked = (o) => {
    actions.push({type: TDActionsTypes.ADD_TODO, payload: todo});
    return {type: TDActionsTypes.ADD_TODO, payload: todo};
  };
  const element = <TDElement todo={todo} onCompleteClicked={onCompleteClicked} />;
  const component: any = ReactDOM.render(element, document.createElement('div'));
  
  component.props.onCompleteClicked(todo);

  expect(actions).toEqual([{type: TDActionsTypes.ADD_TODO, payload: todo}]);
});