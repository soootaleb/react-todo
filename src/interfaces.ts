import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { ABNotificationLevel } from './enumerations';

export interface IMessage<T = Object> {
    type: string,
    source: string,
    destination: string,
    payload: T
}

export interface INode {
    nodePort: string,
    socket: WebSocketSubject<IMessage>,
    state: {
        run: boolean,
        term: number,
        store: {
            store: {key: string, value: string}[]
        },
        state: string,
        peers: string[],
    },
    theme: ITheme,
    messages: IMessage[]
}

export interface IState {
    nodes: { [key: string]: INode },
    notifications: INotification[],
}

export interface INotification {
    level?: ABNotificationLevel;
    header?: string;
    content: string;
}

export interface ITheme {
    primary: string,
    secondary: string,
    minor: string,
    catchy: string
}