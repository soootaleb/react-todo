import { IMessage, INotification } from './interfaces';
import { ABActionsTypes } from './enumerations';

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

export const connectWebSocket = (url: string) => ({
    type: ABActionsTypes.CONNECT_WEBSOCKET,
    payload: url
});

export const addNode = (node: string) => ({
    type: ABActionsTypes.ADD_NODE,
    payload: node
});

export const removeNode = (node: string) => ({
    type: ABActionsTypes.REMOVE_NODE,
    payload: node
});

export const messageReceived = (message: IMessage<{message: IMessage}>) => ({
    type: ABActionsTypes.MESSAGE_RECEIVED,
    payload: message
});