import * as React from 'react';
import { connect } from 'react-redux';

import ABNotification from '../components/ABNotification';
import { INode, INotification, IState } from '../interfaces';
import { removeNotification } from '../actions';
import { ABActionsTypes } from '../enumerations';
import ABLogFlow from '../components/ABLogFlow';
import ABInput from './ABInput';
import { Style } from '../builder';

class ABApplication extends React.Component<{
  nodes: {[key: string]: INode},
  notifications: INotification[],
  onNotificationClicked: (n: ABNotification) => { type: ABActionsTypes, payload: INotification }
}> {

  private style = {
    root: {
      width: '100%',
      height: '100%',
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
    },
    logs: Style.flex().justify('flex-start').width('100%').build()
  };

  private getNotifications(): JSX.Element[] {
    return this.props.notifications.map((notification: INotification, index) => {
      return (
        <ABNotification
          onClick={this.props.onNotificationClicked}
          key={Math.random() * (index + 1)}
          notification={notification}
        />
      );
    });
  }

  public render() {
    return (
      <div style={this.style.root}>
        <h1>ABCD UI</h1>
        <ABInput />
        <div style={this.style.logs}>
          {
            Object.keys(this.props.nodes).map((key: string) => {
              return <ABLogFlow key={key} node={this.props.nodes[key]} />;
            })
          }
        </div>
        <div style={this.style.notifications} >
          {this.getNotifications()}
        </div>
      </div>
    );
  }
}

export default connect((state: IState) => ({
  nodes: state.nodes,
  notifications: state.notifications
}), (dispatch, props) => ({
  onNotificationClicked: (notification: ABNotification) => dispatch(removeNotification(notification.model)),
}))(ABApplication);