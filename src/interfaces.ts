import { TDNotificationLevel, TDTodoCategory } from './enumerations';

export interface ITodo {
    label: string;
    category: TDTodoCategory;
}

export interface INotification {
    level?: TDNotificationLevel;
    header?: string;
    content: string;
}