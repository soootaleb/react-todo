import { IMessage, INotification } from './interfaces';
import { ABActionsTypes } from './enumerations';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

// Application 
export const addNotification = (notification: INotification) => ({
    type: ABActionsTypes.ADD_NOTIFICATION,
    payload: notification
});

export const removeNotification = (notification: INotification) => ({
    type: ABActionsTypes.REMOVE_NOTIFICATION,
    payload: notification
});

// WebSocket

export const connectWebSocket = (port: string) => ({
    type: ABActionsTypes.CONNECT_WEBSOCKET,
    payload: port
});

export const addNode = (node: string, socket: WebSocketSubject<IMessage>) => ({
    type: ABActionsTypes.ADD_NODE,
    payload: {
        node: node,
        socket: socket
    }
});

export const removeNode = (node: string) => ({
    type: ABActionsTypes.REMOVE_NODE,
    payload: node
});

export const messageReceived = (message: IMessage<{message: IMessage}>) => ({
    type: ABActionsTypes.MESSAGE_RECEIVED,
    payload: message
});