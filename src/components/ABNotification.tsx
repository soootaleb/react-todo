import * as React from 'react';
import { baseShadow } from '../styles';
import { ABNotificationLevel, ABColors, ABActionsTypes } from '../enumerations';
import { INotification } from '../interfaces';

export default class ABNotification extends React.Component<{
    notification: INotification,
    onClick: (notification: ABNotification) => { type: ABActionsTypes, payload: INotification }
}> {

    public get model(): INotification {
        return this.props.notification;
    }

    private getBackgroundColor(level: ABNotificationLevel | undefined): ABColors {
        switch (level) {
            case ABNotificationLevel.INFO:
                return ABColors.PRIMARY;
            case ABNotificationLevel.DANGER:
                return ABColors.DANGER;
            case ABNotificationLevel.SUCCESS:
                return ABColors.SUCCESS;
            case ABNotificationLevel.WARNING:
                return ABColors.WARNING;
            default:
                return ABColors.PRIMARY;
        }
    }

    private getFontColor(level: ABNotificationLevel | undefined): ABColors {
        switch (level) {
            case ABNotificationLevel.WARNING:
                return ABColors.BLACK;
            case ABNotificationLevel.SUCCESS:
                return ABColors.BLACK;
            default:
                return ABColors.WHITE;
        }
    }

    private onClick = (event) => {
        return this.props.onClick(this);
    }

    private style = (self: ABNotification) => ({
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
            borderRadius: 1,
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