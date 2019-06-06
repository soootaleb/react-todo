import * as React from 'react';
import { connect } from 'react-redux';

import TDNotification from '../components/TDNotification';
import { INotification } from '../interfaces';
import { removeNotification } from '../actions';
import { TDActionsTypes } from '../enumerations';
import TDInput from './TDInput';
import TDGrid from './TDGrid';

class TDApplication extends React.Component<{
  notifications: INotification[],
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
        <h1>React Todo</h1>
        <TDGrid />
        <TDInput />
        <div style={this.style.notifications} >
          {this.getNotifications()}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  notifications: state.notifications
}), (dispatch, props) => ({
  onNotificationClicked: (notification: TDNotification) => dispatch(removeNotification(notification.model)),
}))(TDApplication);