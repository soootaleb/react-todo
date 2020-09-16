import { combineEpics } from 'redux-observable';
import { ABActionsTypes, ABNotificationLevel } from './enumerations';
import { addNotification, messageReceived, addNode, removeNode, removeNotification } from './actions';
import { Observable } from 'rxjs';
import { IMessage } from './interfaces';

const connectWebSocketEpic = (action, store) => {
    return action.ofType(ABActionsTypes.CONNECT_WEBSOCKET)
        .mergeMap(o => {
            return Observable.concat(
                Observable.from([
                    addNode(o.payload),
                    addNotification({
                        level: ABNotificationLevel.SUCCESS,
                        header: 'WebSocket connected',
                        content: o.payload
                    })
                ]), Observable.webSocket('ws://127.0.0.1:' + o.payload)
                    .map((message: IMessage<{message: IMessage}>) => {
                        /**
                         * Message is wrapped on the backend like this
                         * It means that front receives a regular message but
                         * - source is the node sending the message to the UI
                         * - destination is "ui"
                         * - payload is the actual message that the node wants to forward
                         * 
                         * this.messages.setValue({
                         *     type: "uiLogMessage",
                         *     source: this.net.port,
                         *     destination: "ui",
                         *     payload: {
                         *     message: message
                         *     }
                         * })
                         */
                        return messageReceived(message);
                    }).catch(error => {
                        return Observable.from([
                            removeNode(o.payload),
                            addNotification({
                                level: ABNotificationLevel.DANGER,
                                header: 'WebSocket not connected',
                                content: error.target.url
                            })
                        ]);
                    })
            );
        });
};

const removeNotificationEpic = (action, store) => {
    return action.ofType(ABActionsTypes.ADD_NOTIFICATION)
        .delay(3000)
        .map(o => removeNotification(o.payload));
};

export default combineEpics(...[
    connectWebSocketEpic,
    removeNotificationEpic,
]);
