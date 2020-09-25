import * as React from 'react';

import { IMessage, INode } from '../interfaces';
import ABLogFlow from './ABLogFlow';
import { Style } from '../builder';
import ABButton from './ABButton';
import { baseShadow } from '../styles';
import { ABActionsTypes, ABColors } from '../enumerations';

export default class ABNodeMessages extends React.Component<{
  node: INode,
  sendMessage: (message: IMessage) => { type: ABActionsTypes.SEND_MESSAGE, payload: { node: INode, message: IMessage } }
  nodes: { [key: string]: INode }
}> {

  private keys: string[] = [];
  private requests: {[key: string]: string} = {};

  componentDidMount() {
    for (let index = 0; index < 5; index++) {
      this.keys.push(Math.random().toString(36).substring(2));
    }
  }

  private get key() {
    return this.keys[Math.floor(Math.random() * this.keys.length)];
  }

  private get success() {
    const ok = this.keys.filter((key) => {
      return Object.keys(this.props.node.state.store.store).indexOf(key) !== -1 &&
          this.props.node.state.store.store[key].value === this.requests[key];
    });
    return ((ok.length * 100) / this.keys.length);
  }

  private style = (self: ABNodeMessages) => ({
    root: new Style({
      ...baseShadow,
      height: Object.keys(this.props.nodes).length > 3 ? '400px' : '100%',
      marginBottom: '10px'
    }).padding('5px')
      .flex('column')
      .width('31%')
      .align('stretch')
      .build(),

    nodes: Style.flex().justify('flex-start').build(),
    header: new Style({
      marginBottom: '5px'
    }).flex()
      .align('center')
      .justify('space-between')
      .build(),

    nodeName: new Style({
      color: this.props.node.theme.primary,
      fontSize: '30px',
      fontWeight: 'bold'
    }).build(),

    state: new Style({
      ...baseShadow,
      color: ABColors.WHITE,
      backgroundColor: self.props.node.state === undefined ? ABColors.MINOR :
        self.props.node.state.state === 'leader' ?
          ABColors.LEADER : self.props.node.state.state === 'candidate' ? ABColors.CANDIDATE : ABColors.FOLLOWER
    }).padding('5px 10px').build(),

    peers: new Style({
      color: ABColors.MINOR
    }).padding('5px 0px')
      .flex()
      .build(),

    actions: new Style({
    }).flex().build(),

    headerLeft: Style.flex().center().build(),
    term: new Style({
      marginLeft: '10px',
      backgroundColor: self.props.node.state.term === -1 ? ABColors.DANGER : ABColors.MINOR,
      borderRadius: '30px',
      height: '30px',
      textAlign: 'center',
      color: ABColors.WHITE,
    }).flex().center().width('30px').build(),

    peer: new Style({
      backgroundColor: ABColors.DARK,
      color: ABColors.WHITE,
      borderRadius: '50px',
      marginRight: '10px'
    }).padding('2px 10px').build(),

    variables: new Style({
      maxHeight: '50%',
      overflow: 'scroll' as 'scroll'
    }).build(),

    measure: new Style({
      ...baseShadow,
      position: 'relative',
      height: '30px'
    }).width('100%').build(),
    success: new Style({
      height: '100%',
      transition: 'width 0.5s',
      backgroundColor: ABColors.SUCCESS
    }).flex().center().width(self.success + '%').build(),
    successText: new Style({
      position: 'absolute',
      left: '50%',
      top: '20%'
    }).build()
  })

  private getPeerStyle(peer: string) {
    if (Object.keys(this.props.nodes).indexOf(peer) !== -1) {
      return {
        ...this.style(this).peer,
        backgroundColor: this.props.nodes[peer].theme.minor
      };
    } else {
      return this.style(this).peer;
    }
  }

  public render() {
    return (
      <div style={this.style(this).root}>
        <div style={this.style(this).header}>
          <div style={this.style(this).headerLeft}>
            <div style={this.style(this).nodeName}>{this.props.node.nodePort}</div>
            <span style={this.style(this).term}>{this.props.node.state.term}</span>
          </div>
          <ABButton
            label={this.props.node.state.run ? 'Stop' : 'Run'}
            onClick={() => {
              this.props.sendMessage({
                type: 'runStop',
                source: 'ui',
                destination: this.props.node.nodePort,
                payload: {}
              });
            }}
          />
          <div style={this.style(this).state}>{this.props.node.state.state.toUpperCase()}</div>
        </div>
        <div style={this.style(this).peers}>
          {
            this.props.node.state.peers.length > 0 ?
              this.props.node.state.peers.map((peer, index) => {
                return <span style={this.getPeerStyle(peer)} key={index}>{peer}</span>;
              }) :

              'No peers connected'
          }
        </div>
        <ABLogFlow node={this.props.node} nodes={this.props.nodes} />
        <div style={this.style(this).measure}>
          <div style={this.style(this).success}/>
          <span style={this.style(this).successText}>{this.success}</span>
        </div>
        <pre style={this.style(this).variables}>
          {JSON.stringify(this.props.node.state, null, 4)}
        </pre>
        <div style={this.style(this).actions}>
          <ABButton
            label="Set Foo Bar"
            onClick={() => {
              const value = Math.random().toString(36).substring(2);
              const key = this.key;
              this.requests[key] = value;
              this.props.sendMessage({
                type: 'setKeyValueRequest',
                source: 'ui',
                destination: this.props.node.nodePort,
                payload: {
                  'key': key,
                  'value': value
                }
              });
            }}
          />
          <ABButton
            label="Set Leader"
            onClick={() => {
              this.props.sendMessage({
                type: 'setState',
                source: 'ui',
                destination: this.props.node.nodePort,
                payload: {
                  state: 'leader'
                }
              });
            }}
          />
          <ABButton
            label="Set Follower"
            onClick={() => {
              this.props.sendMessage({
                type: 'setState',
                source: 'ui',
                destination: this.props.node.nodePort,
                payload: {
                  state: 'follower'
                }
              });
            }}
          />
          <ABButton
            label="Set Candidate"
            onClick={() => {
              this.props.sendMessage({
                type: 'setState',
                source: 'ui',
                destination: this.props.node.nodePort,
                payload: {
                  state: 'candidate'
                }
              });
            }}
          />
        </div>
      </div>
    );
  }
}