import * as React from 'react';
import { connect } from 'react-redux';

import TDNotification from '../components/TDNotification';
import { INotification, ISuggestion } from '../interfaces';
import { removeNotification } from '../actions';
import { TDActionsTypes } from '../enumerations';
import TDInput from './TDInput';
import TDOutput from '../components/TDOutput';

import { Style } from '../builder';

class TDApplication extends React.Component<{
  suggestion: ISuggestion,
  notifications: INotification[],
  onNotificationClicked: (n: TDNotification) => { type: TDActionsTypes, payload: INotification }
}> {

  private style = {
    img: {
      height: '50px',
      marginRight: '5%'
    },
    main: new Style({height: '60%'}).flex()
    .align('stretch').width('70%')
    .mobile(
        Style.flex('column')
        .center()
        .width('100%')
        .build()
    ).build(),
    root: new Style({
      width: '100%',
      height: 'auto',
      display: 'flex',
      alignItems: 'center' as 'center',
      flexDirection: 'column' as 'column',
    }).build(),
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
        <div style={new Style({height: '10%'}).flex().center().width('100%').build()}>
            <img style={this.style.img} src="/logo.png"/>
            <h1>Agnostic 2 Cloud</h1>
        </div>
        <h4 style={({textAlign: 'center'})}>
            Small POC to map an agnostic compute requirement to a cloud provider product
        </h4>
        <ul>
            <li>Values are optional</li>
            <li>Values can only be numbers</li>
            <li>Not specifying a value will result in auto selection</li>
            <li>Suggested disk is null <strong>to define for block storage</strong></li>
        </ul>
        <div style={this.style.main}>
            <TDInput />
            <TDOutput suggestion={this.props.suggestion} />
        </div>
        <div style={this.style.notifications} >
          {this.getNotifications()}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  suggestion: state.suggestion,
  notifications: state.notifications
}), (dispatch, props) => ({
  onNotificationClicked: (notification: TDNotification) => dispatch(removeNotification(notification.model)),
}))(TDApplication);