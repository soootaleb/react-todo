import { combineEpics } from 'redux-observable';
import { TDActionsTypes, TDNotificationLevel } from './enumerations';
import { addNotification, messageReceived, addNode, removeNode, removeNotification } from './actions';
import { Observable } from 'rxjs';
import { IMessage } from './interfaces';

const connectWebSocketEpic = (action, store) => {
    return action.ofType(TDActionsTypes.CONNECT_WEBSOCKET)
        .switchMap(o => {
            return Observable.concat(
                Observable.from([
                    addNode(o.payload),
                    addNotification({
                        level: TDNotificationLevel.SUCCESS,
                        header: 'WebSocket connected',
                        content: o.payload
                    })
                ]), Observable.webSocket('ws://127.0.0.1:' + o.payload)
                    .map((message: IMessage) => {
                        return messageReceived({
                            nodePort: o.payload,
                            message: message
                        });
                    }).catch(error => {
                        return Observable.from([
                            removeNode(o.payload),
                            addNotification({
                                level: TDNotificationLevel.DANGER,
                                header: 'WebSocket not connected',
                                content: error.target.url
                            })
                        ]);
                    })
            );
        });
};

const removeNotificationEpic = (action, store) => {
    return action.ofType(TDActionsTypes.ADD_NOTIFICATION)
        .delay(3000)
        .map(o => removeNotification(o.payload));
};

export default combineEpics(...[
    connectWebSocketEpic,
    removeNotificationEpic,
]);
