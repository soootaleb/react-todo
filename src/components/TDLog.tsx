import * as React from 'react';
import { IMessage } from '../interfaces';
import { baseShadow } from '../styles';

export default class TDLog extends React.Component<{
    log: IMessage
}> {

    private style = (self: TDLog) => ({
        root: {
            ...baseShadow,
            borderRadius: 3,
            width: '100%',
            paddingLeft: 10,
            boxSizing: 'border-box ',
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'space-between' as 'space-between',
            alignItems: 'center' as 'center',
            position: 'relative' as 'relative',
            marginTop: 10,
            backgroundColor: 'white'
        }
    })

    public render() {
        return (
            <li style={this.style(this).root} >
                <pre>
                    {JSON.stringify(this.props.log, null, 4)}
                </pre>
            </li>
        );
    }
}