import { TDNotificationLevel } from './enumerations';

export interface ITodo {
    label: string;
    completed: boolean;
}

export interface INotification {
    level?: TDNotificationLevel;
    header?: string;
    content: string;
}