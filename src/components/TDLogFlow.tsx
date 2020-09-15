import * as React from 'react';
import { IMessage, INode } from '../interfaces';
import { TDColors } from '../enumerations';
import { Style } from '../builder';
import TDLog from './TDLog';

export default class TDLogFlow extends React.Component<{
  node: INode
}> {

  private get messages(): IMessage[] {
    return this.props.node.messages.filter((message: IMessage) => message.type !== 'heartBeat');
  }

  private style = {
    root: new Style({
      height: 'auto',
      padding: 0,
      margin: 0,
      marginBottom: '5%',
      display: 'flex',
      alignItems: 'center' as 'center',
      flexDirection: 'column' as 'column',
    }).width('30%').build(),
    noTodos: {
      color: TDColors.MINOR,
      fontWeight: 100 as 100
    }
  };

  private getElements(): JSX.Element[] {
    return this.messages.map((log: IMessage, index) => {
        return (
          <TDLog
            key={JSON.stringify(log) + '-' + index.toString()}
            // key={Math.random() * (index + 1)}
            log={log}
          />
        );
      });
  }

  public render() {
    if (this.messages.length > 0) {
      return (
        <ul style={this.style.root}>
          {this.getElements()}
        </ul>
      );
    } else {
      return <p style={this.style.noTodos}>No logs for the moment</p>;
    }
  }
}