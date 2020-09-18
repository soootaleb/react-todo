import * as React from 'react';
import { connect } from 'react-redux';

import ABNotification from '../components/ABNotification';
import { IMessage, INode, INotification, IState } from '../interfaces';
import { connectWebSocket, removeNotification, sendMessage } from '../actions';
import { ABActionsTypes } from '../enumerations';
import ABInput from './ABInput';
import { Style } from '../builder';
import ABNodeMessages from '../components/ABNodeMessages';

class ABApplication extends React.Component<{
  nodes: { [key: string]: INode },
  notifications: INotification[],
  sendMessage: (node: INode, message: IMessage) => {
    type: ABActionsTypes.SEND_MESSAGE,
    payload: { node: INode, message: IMessage }
  },
  onAppStart: (o: string) => { type: ABActionsTypes, payload: string }
  onNotificationClicked: (n: ABNotification) => { type: ABActionsTypes, payload: INotification }
}> {

  private style = (self: ABApplication) => ({
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
    nodes: new Style({
      flexWrap: 'wrap',
      position: 'relative',
      height: Object.keys(this.props.nodes).length <= 3 ? '100%' : '300px'
    }).flex().justify('space-around').width('100%').build(),

    header: new Style({
      boxSizing: 'border-box'
    }).flex().justify('flex-start').align('center').padding('10px').width('100%').build(),

    title: new Style({
      margin: 0,
      marginRight: '30px'
    }).build()
  })

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

  componentDidMount() {
    this.props.onAppStart('8080');
  }

  public render() {
    return (
      <div style={this.style(this).root}>
        <div style={this.style(this).header}>
          {/* <h1 style={this.style.title}>ABCD UI</h1> */}
          <ABInput />
        </div>
        <div style={this.style(this).nodes}>
          {
            Object.keys(this.props.nodes).map((key: string) => {
              return <ABNodeMessages
                key={key}
                sendMessage={(message: IMessage) => this.props.sendMessage(this.props.nodes[key], message)}
                node={this.props.nodes[key]}
                nodes={this.props.nodes}
              />;
            })
          }
        </div>
        <div style={this.style(this).notifications} >
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
  sendMessage: (node: INode, message: IMessage) => dispatch(sendMessage(node, message)),
  onAppStart: (port: string) => dispatch(connectWebSocket(port)),
  onNotificationClicked: (notification: ABNotification) => dispatch(removeNotification(notification.model)),
}))(ABApplication);