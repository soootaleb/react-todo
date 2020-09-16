import * as React from 'react';
import { IMessage, INode } from '../interfaces';
import { ABColors } from '../enumerations';
import { Style } from '../builder';
import ABLog from './ABLog';

export default class ABLogFlow extends React.Component<{
  node: INode
}> {

  private ul: HTMLUListElement;

  private get messages(): IMessage[] {
    return this.props.node.messages.filter((message: IMessage<IMessage>) => {
      return message.payload.type !== 'heartBeat'
        && message.type !== 'uiStateUpdate';
    });
  }

  private style = {
    root: new Style({
      margin: 0,
      padding: 0,
      overflow: 'scroll' as 'scroll',
      backgroundColor: ABColors.DARK,
    }).flex('column').expand().align('flex-start').build(),
    noMessages: {
      color: ABColors.WHITE,
      fontWeight: 100 as 100
    }
  };

  private getElements(): JSX.Element[] {
    return this.messages.map((log: IMessage, index) => {
      return (
        <ABLog
          key={index}
          log={log}
        />
      );
    });
  }

  public render() {
    if (this.messages.length > 0) {
      return (
        <ul ref={(el: HTMLUListElement) => this.ul = el} style={this.style.root}>
          {this.getElements()}
        </ul>
      );
    } else {
      return <p style={this.style.noMessages}>No logs for the moment</p>;
    }
  }
}