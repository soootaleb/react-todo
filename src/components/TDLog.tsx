import * as React from 'react';
import { Style } from '../builder';
import { IMessage } from '../interfaces';
import { baseShadow } from '../styles';

export default class TDLog extends React.Component<{
    log: IMessage
}> {

    private style = (self: TDLog) => ({
        root: new Style({
            ...baseShadow,
            borderRadius: 3,
            padding: 10,
            boxSizing: 'border-box ',
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'space-between' as 'space-between',
            alignItems: 'center' as 'center',
            position: 'relative' as 'relative',
            marginTop: 10,
            backgroundColor: 'white'
        }).width('100%').build()
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