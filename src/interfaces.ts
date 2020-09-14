import { TDNotificationLevel, TDTodoCategory } from './enumerations';

export interface IState {
    todos: ITodo[],
    notifications: INotification[]
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