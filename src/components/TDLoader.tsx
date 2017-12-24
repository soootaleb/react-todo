import * as React from 'react';

export default class TDLoader extends React.Component {

    private style = {
        width: 50,
        height: 50,
        border: '16px solid #f3f3f3',
        borderTop: '16px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 2s linear infinite'
    };

    public render() {
        return <div style={this.style}/>;
    }
}