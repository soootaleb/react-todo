import { TDNotificationLevel, TDTodoCategory } from './enumerations';

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
    todos: ITodo[],
    nodes: {[key: string]: INode},
    notifications: INotification[],
}

export interface ITodo {
    label: string;
    category: TDTodoCategory;
}

export interface INotification {
    level?: TDNotificationLevel;
    header?: string;
    content: string;
}