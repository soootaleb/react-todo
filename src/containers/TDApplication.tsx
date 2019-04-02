import * as React from 'react';
import { connect } from 'react-redux';

import TDNotification from '../components/TDNotification';
import { INotification } from '../interfaces';
import { removeNotification, connectWebSocket } from '../actions';
import { TDActionsTypes } from '../enumerations';
import TDList from './TDList';
import TDInput from './TDInput';

class TDApplication extends React.Component<{
  notifications: INotification[],
  onApplicationDidMount: (url: string) => { type: TDActionsTypes, payload: string },
  onNotificationClicked: (n: TDNotification) => { type: TDActionsTypes, payload: INotification }
}> {

  private style = {
    img: {
      height: '10%',
      marginTop: '10%'
    },
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
    this.props.onApplicationDidMount('ws://projet-gateway.5dpb3nqcpm.eu-west-3.elasticbeanstalk.com:80');
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
        <img style={this.style.img} src="https://upload.wikimedia.org/wikipedia/fr/d/de/Logo_Paris_Descartes.png"/>
        <h1>Todo Descartes</h1>
        <TDList />
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
  onApplicationDidMount: (url: string) => dispatch(connectWebSocket(url)),
  onNotificationClicked: (notification: TDNotification) => dispatch(removeNotification(notification.model)),
}))(TDApplication);