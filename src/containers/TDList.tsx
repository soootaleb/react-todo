import * as React from 'react';
import { connect } from 'react-redux';
import { ITodo } from '../interfaces';
import { completeTodo, addNotification } from '../actions';
import { TDActionsTypes, TDColors, TDNotificationLevel } from '../enumerations';
import TDElement from '../components/TDElement';
import { Style } from '../builder';

class TDList extends React.Component<{
  elements: ITodo[],
  onCompleteClicked: (todo: ITodo) => { type: TDActionsTypes, payload: ITodo }
}> {

  private style = {
    root: new Style({
      width: '50%',
      height: 'auto',
      padding: 0,
      display: 'flex',
      alignItems: 'center' as 'center',
      flexDirection: 'column' as 'column',
    }).mobile({
        width: '90%'
    }).build(),
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

export default connect((state) => ({
  elements: state.todos
}), (dispatch, props) => ({
  onCompleteClicked: (element: ITodo) => {
    dispatch(addNotification({
      level: TDNotificationLevel.INFO,
      header: 'Good job !',
      content: 'Todo removed'
    }));
    dispatch(completeTodo(element));
  }
}))(TDList);