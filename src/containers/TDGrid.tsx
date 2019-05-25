import * as React from 'react';
import { connect } from 'react-redux';
import { ITodo } from '../interfaces';
import { completeTodo, addNotification } from '../actions';
import { TDActionsTypes, TDColors, TDNotificationLevel } from '../enumerations';
import { Style } from '../builder';
import TDList from './TDList';

class TDGrid extends React.Component<{
  elements: ITodo[],
  onCompleteClicked: (todo: ITodo) => { type: TDActionsTypes, payload: ITodo }
}> {

  private style = {
    root: Style.flex()
        .row()
        .build(),
    noTodos: {
      color: TDColors.MINOR,
      fontWeight: 100 as 100
    },
    header: new Style({
        margin: '1%',
        alignSelf: 'flex-start',
        marginLeft: '5%'
    }).flex().build(),
    col: Style.flex('column')
        .expand()
        .align('center')
        .build()
  };

  public render() {
    if (this.props.elements.length > 0) {
        return (
            <div style={this.style.root}>
                <div style={this.style.col}>
                    <p style={this.style.header}>ToDo</p>
                  <TDList />
                </div>
                <div style={this.style.col}>
                    <p style={this.style.header}>Doing</p>
                    <TDList />
                </div>
                <div style={this.style.col}>
                    <p style={this.style.header}>Done</p>
                    <TDList />
                </div>
            </div>
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
}))(TDGrid);