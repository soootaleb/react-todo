import * as React from 'react';
import { baseShadow } from '../styles';
import { Style } from '../builder';
import { ISuggestion } from '../interfaces';

export default class TDOutput extends React.Component<{
    suggestion: ISuggestion
}> {

    private style = (self: TDOutput) => ({
        root: new Style({
            ...baseShadow,
            width: '50%',
            display: 'flex',
            alignItems: 'stretch' as 'stretch'
        }).mobile({
            width: '90%'
        }).build()
    })

    public render() {
        return <pre style={this.style(this).root}>{JSON.stringify(this.props.suggestion, null, 4)}</pre>;
    }
}