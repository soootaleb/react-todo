import * as React from 'react';
import { Style } from '../builder';
import { ABColors } from '../enumerations';
import { IMessage, INode } from '../interfaces';

export default class ABLog extends React.Component<{
    log: IMessage,
    node: INode,
    nodes: { [key: string]: INode }
}> {

    private hover: boolean = false;

    private style = (self: ABLog) => ({
        root: new Style({
            padding: 2,
            cursor: 'pointer',
            position: 'relative',
            color: ABColors.WHITE,
            boxSizing: 'border-box',
            backgroundColor: 'transparent'
        }).flex()
            .align('center')
            .justify('flex-start')
            .width('100%')
            .build(),

        up_or_down: new Style({}).build(),

        type: new Style({
            fontFamily: 'Courier New'
        }).build(),

        source: new Style({
            borderRadius: 30,
            minWidth: '60px',
            marginLeft: '5px',
            textAlign: 'center',
            backgroundColor: this.sourceColor
        }).padding('2px 0px').build(),

        destination: new Style({
            borderRadius: 30,
            minWidth: '60px',
            margin: '0px 5px',
            textAlign: 'center',
            backgroundColor: this.destinationColor
        }).padding('2px 0px').build(),

        payload: new Style({
            position: 'absolute',
            width: 'auto',
            height: 'auto',
            borderRadius: '2px',
            zIndex: 10,
            margin: 0,
            color: ABColors.BLACK,
            padding: '10px',
            top: '100%',
            right: '10px',
            backgroundColor: ABColors.WHITE
        }).build()
    })

    private get upOrDownStyle() {
        return {
            ...this.style(this).up_or_down,
            color: this.internal ? ABColors.PRIMARY : this.received ? ABColors.DANGER : ABColors.SUCCESS
        };
    }

    private get internal(): Boolean {
        return /[a-z]+/g.test(this.props.log.source)
            && /[a-z]+/g.test(this.props.log.destination);
    }

    private get received(): Boolean {
        return !/[a-z]+/g.test(this.props.log.source);
    }

    private get sourceColor(): string {
        return this.internal ? ABColors.PRIMARY :
            Object.keys(this.props.nodes).indexOf(this.props.log.source) === -1 ?
                ABColors.PRIMARY : this.props.nodes[this.props.log.source].theme.primary;
    }

    private get destinationColor(): string {
        return this.internal ? ABColors.PRIMARY :
            Object.keys(this.props.nodes).indexOf(this.ip) === -1 ?
                ABColors.PRIMARY : this.props.nodes[this.ip].theme.primary;
    }

    private get ip(): string {
        return this.props.log.destination;
    }

    public render() {
        return (
            <div
                onMouseEnter={() => this.hover = true}
                onMouseLeave={() => this.hover = false}
                style={this.style(this).root}
            >
                <span className="material-icons" style={this.upOrDownStyle}>
                    {this.internal ? 'loop' : this.received ? 'arrow_circle_down' : 'arrow_circle_up'}
                </span>
                <span style={this.style(this).source}>
                    {this.props.log.source.substr(0, 5)}
                </span>
                <span style={this.style(this).destination}>
                    {this.ip.substr(0, 5)}
                </span>
                <span style={this.style(this).type}>{this.props.log.type}</span>
                {this.hover ? <pre style={this.style(this).payload}>
                    {JSON.stringify(this.props.log, null, 4)}
                </pre> : null}
            </div>
        );
    }
}