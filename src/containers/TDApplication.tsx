import * as React from 'react';
import { connect } from 'react-redux';

import TDNotification from '../components/TDNotification';
import { INode, INotification, IState } from '../interfaces';
import { connectWebSocket, removeNotification } from '../actions';
import { TDActionsTypes } from '../enumerations';
import TDLogFlow from '../components/TDLogFlow';

class TDApplication extends React.Component<{
  nodes: {[key: string]: INode},
  notifications: INotification[],
  onApplicationDidMount: (url: string) => { type: TDActionsTypes, payload: string },
  onNotificationClicked: (n: TDNotification) => { type: TDActionsTypes, payload: INotification }
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
    }
  };

  componentDidMount() {
    this.props.onApplicationDidMount('ws://localhost:8080');
  }

  private getNotifications(): JSX.Element[] {
    return this.props.notifications.map((notification: INotification, index) => {
      return (
        <TDNotification
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
        {
          Object.keys(this.props.nodes).map((key: string) => {
            return <TDLogFlow key={key} node={this.props.nodes[key]} />;
          })
        }
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
  onApplicationDidMount: (url: string) => dispatch(connectWebSocket(url)),
  onNotificationClicked: (notification: TDNotification) => dispatch(removeNotification(notification.model)),
}))(TDApplication);