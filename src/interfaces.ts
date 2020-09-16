import { ABNotificationLevel } from './enumerations';

export interface IMessage<T = Object> {
    type: string,
    source: string,
    destination: string,
    payload: T
}

export interface INode {
    nodePort: string,
    messages: IMessage[]
}

export interface IState {
    nodes: {[key: string]: INode},
    notifications: INotification[],
}

export interface INotification {
    level?: ABNotificationLevel;
    header?: string;
    content: string;
}