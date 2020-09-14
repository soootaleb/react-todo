import { combineEpics } from 'redux-observable';
import { TDActionsTypes, TDNotificationLevel } from './enumerations';
import { addNotification, messageReceived, removeNotification } from './actions';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Observable } from 'rxjs';

let ws: WebSocketSubject<any>;

const connectWebSocketEpic = (action, store) => {
    return action.ofType(TDActionsTypes.CONNECT_WEBSOCKET)
        .switchMap(o => {
            ws = Observable.webSocket(o.payload);
            return ws.switchMap((message) => {
                return Observable.from([
                    messageReceived({
                        nodePort: '8080',
                        message: message
                    })
                ]);
            }).catch(error => {
                return Observable.of(addNotification({
                    level: TDNotificationLevel.DANGER,
                    header: 'Failed to connect WebSocket',
                    content: error.toString()
                }));
            });
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
