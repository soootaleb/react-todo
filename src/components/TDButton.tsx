import * as React from 'react';
import { baseShadow, buttonBackground } from '../styles';

export default class TDButton extends React.Component<{
    label?: string,
    onClick: any
}> {

    public state = {
        hover: false
    };

    private style = (self: TDButton) => ({
        ...baseShadow, // This a static mixin
        ...buttonBackground(self), // This is a functionnal mixin
        width: 'auto',
        height: 25,
        cursor: 'pointer',
        borderRadius: 1,
        border: 0,
        margin: 10,
        color: 'white'
    })

    public mouseOver = () => {
        this.setState({ hover: true });
    }

    public mouseOut = () => {
        this.setState({ hover: false });
    }

    public render() {
        return (
            <button
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                onClick={this.props.onClick}
                style={this.style(this)}
            >
                {this.props.label}
            </button>
        );
    }
}