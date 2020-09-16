import { IMessage, INotification, ITodo } from './interfaces';
import { TDActionsTypes } from './enumerations';

// TODO 

export const completeTodo = (todo: ITodo) => ({
    type: TDActionsTypes.COMPLETE_TODO,
    payload: todo
});

// Application 
export const addNotification = (notification: INotification) => ({
    type: TDActionsTypes.ADD_NOTIFICATION,
    payload: notification
});

export const removeNotification = (notification: INotification) => ({
    type: TDActionsTypes.REMOVE_NOTIFICATION,
    payload: notification
});

// WebSocket

export const connectWebSocket = (url: string) => ({
    type: TDActionsTypes.CONNECT_WEBSOCKET,
    payload: url
});

export const addNode = (node: string) => ({
    type: TDActionsTypes.ADD_NODE,
    payload: node
});

export const removeNode = (node: string) => ({
    type: TDActionsTypes.REMOVE_NODE,
    payload: node
});

export const messageReceived = (message: IMessage<{message: IMessage}>) => ({
    type: TDActionsTypes.MESSAGE_RECEIVED,
    payload: message
});