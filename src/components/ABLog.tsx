import * as React from 'react';
import { Style } from '../builder';
import { ABColors } from '../enumerations';
import { IMessage, INode } from '../interfaces';

export default class ABLog extends React.Component<{
    log: IMessage,
    node: INode,
    nodes: { [key: string]: INode }
}> {

    private style = (self: ABLog) => ({
        root: new Style({
            padding: 2,
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
        }).padding('2px 0px').build()
    })

    private get upOrDownStyle() {
        return {
            ...this.style(this).up_or_down,
            color: this.internal ? ABColors.PRIMARY : this.sent ? ABColors.SUCCESS : ABColors.DANGER
        };
    }

    private get internal(): Boolean {
        return Number.isNaN(parseInt(this.props.log.source, 10))
            && Number.isNaN(parseInt(this.props.log.destination, 10));
    }

    private get sent(): Boolean {
        return this.props.node.nodePort === this.props.log.source;
    }

    private get sourceColor(): string {
        return this.internal ? ABColors.PRIMARY :
            Object.keys(this.props.nodes).indexOf(this.props.log.source) === -1 ?
                ABColors.PRIMARY : this.props.nodes[this.props.log.source].theme.primary;
    }

    private get destinationColor(): string {
        return this.internal ? ABColors.PRIMARY :
            Object.keys(this.props.nodes).indexOf(this.props.log.destination) === -1 ?
                ABColors.PRIMARY : this.props.nodes[this.props.log.destination].theme.primary;
    }

    public render() {
        return (
            <div style={this.style(this).root} >
                <span className="material-icons" style={this.upOrDownStyle}>
                    {this.internal ? 'loop' : this.sent ? 'arrow_circle_up' : 'arrow_circle_down'}
                </span>
                <span style={this.style(this).source}>
                    {this.props.log.source}
                </span>
                <span style={this.style(this).destination}>
                    {this.props.log.destination}
                </span>
                <span style={this.style(this).type}>{this.props.log.type}</span>
                {/* <pre>
                    {JSON.stringify(this.props.log, null, 4)}
                </pre> */}
            </div>
        );
    }
}