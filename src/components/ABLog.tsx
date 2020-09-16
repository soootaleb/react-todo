import * as React from 'react';
import { Style } from '../builder';
import { ABColors } from '../enumerations';
import { IMessage } from '../interfaces';

export default class ABLog extends React.Component<{
    log: IMessage
}> {

    private style = (self: ABLog) => ({
        root: new Style({
            borderRadius: 3,
            padding: 10,
            color: ABColors.WHITE,
            boxSizing: 'border-box ',
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'space-between' as 'space-between',
            alignItems: 'center' as 'center',
            position: 'relative' as 'relative',
            marginTop: 10,
            backgroundColor: 'transparent'
        }).width('auto').build()
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