import { IMessage, INotification, ITodo } from './interfaces';
import { TDActionsTypes } from './enumerations';

// TODO 
export const addTodo = (todo: ITodo) => ({
    type: TDActionsTypes.ADD_TODO,
    payload: todo
});

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

export const nodeConnected = (nodePort: string) => ({
    type: TDActionsTypes.NODE_CONNECTED,
    payload: nodePort
});

export const messageReceived = (message: {nodePort: string, message: IMessage}) => ({
    type: TDActionsTypes.MESSAGE_RECEIVED,
    payload: message
});