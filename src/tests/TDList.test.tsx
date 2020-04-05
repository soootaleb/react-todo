// Link.react-test.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TDList from '../components/TDList';
import { TDActionsTypes, TDTodoCategory } from '../enumerations';

const todos = [
  {label: 'MyTodoTodo', category: TDTodoCategory.TODO},
  {label: 'MyTodoDoing', category: TDTodoCategory.DOING},
  {label: 'MyTodoDone', category: TDTodoCategory.DONE},
];

let actions: any[] = [];

test('TDList is created with proper todos', () => {
  const element = <TDList
    elements={todos.filter(e => e.category === TDTodoCategory.TODO)}
    onCompleteClicked={(o) => ({type: TDActionsTypes.ADD_TODO, payload: {label: 'MyTodoDoing', category: TDTodoCategory.DOING}})}
  />;
  const component: any = ReactDOM.render(element, document.createElement('div'));

  expect(component).toBeTruthy();
  expect(component.props.elements).toEqual([{label: 'MyTodoTodo', category: TDTodoCategory.TODO}]);
});

test('TDList is calling its onCompleteClicked property', () => {
  const todo = {label: 'MyTodoDoing', category: TDTodoCategory.DOING}
  const onCompleteClicked = (o) => {
    actions.push({type: TDActionsTypes.ADD_TODO, payload: todo});
    return {type: TDActionsTypes.ADD_TODO, payload: todo};
  };
  const element = <TDList
    elements={todos.filter(e => e.category === TDTodoCategory.TODO)}
    onCompleteClicked={onCompleteClicked}
  />;
  const component: any = ReactDOM.render(element, document.createElement('div'));
  
  component.props.onCompleteClicked(todo);

  expect(actions).toEqual([{type: TDActionsTypes.ADD_TODO, payload: todo}]);
});