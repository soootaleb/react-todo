import * as React from 'react';
import { ITodo } from '../interfaces';
import { TDActionsTypes, TDColors } from '../enumerations';
import TDElement from './TDElement';
import { Style } from '../builder';

export default class TDList extends React.Component<{
  elements: ITodo[],
  onCompleteClicked: (todo: ITodo) => { type: TDActionsTypes, payload: ITodo }
}> {

  private style = {
    root: new Style({
      height: 'auto',
      padding: 0,
      margin: 0,
      marginBottom: '5%',
      display: 'flex',
      alignItems: 'center' as 'center',
      flexDirection: 'column' as 'column',
    }).width('95%').build(),
    noTodos: {
      color: TDColors.MINOR,
      fontWeight: 100 as 100
    }
  };

  private getElements(): JSX.Element[] {
    return this.props.elements.map((todo: ITodo, index) => {
      return (
        <TDElement
          key={Math.random() * (index + 1)}
          todo={todo}
          onCompleteClicked={this.props.onCompleteClicked}
        />
      );
    });
  }

  public render() {
    if (this.props.elements.length > 0) {
      return (
        <ul style={this.style.root}>
          {this.getElements()}
        </ul>
      );
    } else {
      return <p style={this.style.noTodos}>No todo for the moment. Add one !</p>;
    }
  }
}