import * as React from 'react';
import { baseShadow } from '../styles';
import { TDNotificationLevel, TDColors, TDActionsTypes } from '../enumerations';
import { INotification } from '../interfaces';

export default class TDNotification extends React.Component<{
    notification: INotification,
    onClick: (notification: TDNotification) => { type: TDActionsTypes, payload: any }
}> {

    public get model(): INotification {
        return this.props.notification;
    }

    private getBackgroundColor(level: TDNotificationLevel | undefined): TDColors {
        switch (level) {
            case TDNotificationLevel.INFO:
                return TDColors.NIGHT_BLUE;
            case TDNotificationLevel.DANGER:
                return TDColors.CORAL;
            case TDNotificationLevel.SUCCESS:
                return TDColors.AQUARMARINE;
            case TDNotificationLevel.WARNING:
                return TDColors.CHROME_YELLOW;
            default:
                return TDColors.NIGHT_BLUE;
        }
    }

    private getFontColor(level: TDNotificationLevel | undefined): TDColors {
        switch (level) {
            case TDNotificationLevel.WARNING:
                return TDColors.INK_BLUE;
            case TDNotificationLevel.SUCCESS:
                return TDColors.INK_BLUE;
            default:
                return TDColors.NOT_WHITE;
        }
    }

    private onClick = (event) => {
        return this.props.onClick(this);
    }

    private style = (self: TDNotification) => ({
        root: {
            ...baseShadow, // This a static mixin
            top: 10,
            width: 200,
            right: 10,
            color: this.getFontColor(self.props.notification.level),
            cursor: 'pointer',
            border: 0,
            position: 'relative' as 'relative',
            paddingLeft: 10,
            borderRadius: 3,
            marginBottom: 10,
            backgroundColor: this.getBackgroundColor(self.props.notification.level),
        },
        header: {
            fontSize: 16,
            fontSyle: 'bold'
        },
        content: {

        }
    })

    public render() {
        let header: JSX.Element | null;
        if (this.props.notification.header) {
            header = <h1 style={this.style(this).header} >{this.props.notification.header}</h1>;
        } else {
            header = null;
        }
        return (
            <div style={this.style(this).root} onClick={this.onClick}>
                {header}
                <p style={this.style(this).content} >{this.props.notification.content}</p>
            </div>
        );
    }
}