import * as React from 'react';
import { connect } from 'react-redux';
import { ITodo } from '../interfaces';
import { completeTodo } from '../actions';
import { TDActionsTypes } from '../enumerations';
import TDElement from '../components/TDElement';

class TDList extends React.Component<{
  elements: ITodo[],
  onCompleteClicked: (todo: ITodo) => { type: TDActionsTypes, payload: ITodo }
}> {

  private style = {
    root: {
      width: '50%',
      height: 'auto',
      padding: 0,
      display: 'flex',
      alignItems: 'center' as 'center',
      flexDirection: 'column' as 'column',
    },
    notifications: {
      top: 0,
      right: 0,
      width: 'auto',
      display: 'flex',
      position: 'absolute' as 'absolute',
      flexDirection: 'column' as 'column',
      backgroundColor: 'transparent',
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
    return (
      <ul style={this.style.root}>
        {this.getElements()}
      </ul>
    );
  }
}

export default connect((state) => ({
  elements: state.todos
}), (dispatch, props) => ({
  onCompleteClicked: (element: ITodo) => dispatch(completeTodo(element))
}))(TDList);