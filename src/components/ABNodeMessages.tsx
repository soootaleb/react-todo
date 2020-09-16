import * as React from 'react';

import { INode } from '../interfaces';
import ABLogFlow from './ABLogFlow';
import { Style } from '../builder';
import ABButton from './ABButton';
import { baseShadow } from '../styles';
import { ABColors } from '../enumerations';

export default class ABNodeMessages extends React.Component<{
  node: INode
}> {

  private style = (self: ABNodeMessages) => ({
    root: new Style({
      ...baseShadow,
      height: '600px',
      marginTop: '1%',
    }).padding('10px')
    .flex('column')
    .width('30%')
    .align('stretch')
    .build(),

    nodes: Style.flex().justify('flex-start').build(),
    header: new Style({
    }).flex()
    .padding('10px 0px')
    .align('center')
    .justify('space-between')
    .build(),

    nodeName: new Style({
      fontSize: '30px',
      fontWeight: 'bold'
    }).build(),
    state: new Style({
      ...baseShadow,
      color: ABColors.WHITE,
      backgroundColor: self.props.node.state === undefined ? ABColors.WHITE :
        self.props.node.state.state === 'leader' ?
        ABColors.CATCHY : self.props.node.state.state === 'candidate' ? ABColors.WARNING : ABColors.SECONDARY
    }).padding('5px 10px').build(),

    peers: new Style({
      color: ABColors.MINOR
    }).padding('10px 0px')
    .flex()
    .build(),
    
    actions: new Style({
    }).flex().build(),

    headerLeft: Style.flex().center().build(),
    term: new Style({
      marginLeft: '10px',
      backgroundColor: self.props.node.state.term === -1 ? ABColors.DANGER : ABColors.INFO,
      borderRadius: '30px',
      height: '30px',
      textAlign: 'center',
      color: ABColors.WHITE,
    }).flex().center().width('30px').build(),

    peer: new Style({
      backgroundColor: ABColors.INFO,
      color: ABColors.WHITE,
      borderRadius: '5px',
      marginLeft: '10px'
    }).padding('5px').build()
  })

  public render() {
    return (
      <div style={this.style(this).root}>
        <div style={this.style(this).header}>
          <div style={this.style(this).headerLeft}>
            <div style={this.style(this).nodeName}>{this.props.node.nodePort}</div>
            <span style={this.style(this).term}>{this.props.node.state.term}</span>
          </div>
          <div style={this.style(this).state}>{this.props.node.state.state}</div>
        </div>
        <div style={this.style(this).peers}>
          {
            this.props.node.state.peers.length > 0 ?
              this.props.node.state.peers.map((peer, index) => {
                return <span style={this.style(this).peer} key={index}>{peer}</span>;
              }) :

              'No peers connected'
          }
        </div>
        <ABLogFlow node={this.props.node} />
        <div style={this.style(this).actions}>
          <ABButton label="Kill"onClick={console.log}/>
          <ABButton label="Set Leader" onClick={console.log}/>
          <ABButton label="Set Follower" onClick={console.log}/>
          <ABButton label="Set Candidate" onClick={console.log}/>
        </div>
        
      </div>
    );
  }
}