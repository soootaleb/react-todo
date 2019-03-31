import { combineEpics } from 'redux-observable';
import { TDActionsTypes, TDNotificationLevel } from './enumerations';
import { removeNotification, addNotification, messageReceived } from './actions';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

let ws: WebSocketSubject<any>;

const connectWebSocketEpic = (action, store) => {
    return action.ofType(TDActionsTypes.CONNECT_WEBSOCKET)
        .switchMap(o => {
            ws = Observable.webSocket(o.payload);
            return ws.map(messageReceived).catch(error => {
                return Observable.of(addNotification({
                    level: TDNotificationLevel.DANGER,
                    header: 'Failed to connect WebSocket',
                    content: error.toString()
                }));
            });
        });
};

const messageReceivedEpic = (action, store) => {
    return action.ofType(TDActionsTypes.MESSAGE_RECEIVED)
        .map(o => addNotification({
            header: 'Received a message',
            content: o.payload.message,
        }));
};

const addTodoEpic = (action, store) => {
    return action.ofType(TDActionsTypes.ADD_TODO)
        .do(o => ws.next(JSON.stringify(o.payload)))
        .map(o => addNotification({
            level: TDNotificationLevel.SUCCESS,
            header: 'ToDo added successfuly',
            content: o.payload.label
        })).catch(error => {
            return Observable.of(addNotification({
                level: TDNotificationLevel.DANGER,
                header: 'Failed to send todo',
                content: error.toString()
            }));
        });
};

const removeNotificationEpic = (action, store) => {
    return action.ofType(TDActionsTypes.ADD_NOTIFICATION)
        .delay(3000)
        .map(o => removeNotification(o.payload));
};

export default combineEpics(...[
    addTodoEpic,
    messageReceivedEpic,
    connectWebSocketEpic,
    removeNotificationEpic,
]);
