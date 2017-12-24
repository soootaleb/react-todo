import { TDNotificationLevel } from './enumerations';

export interface ITodo {
    label: string;

}

export interface INotification {
    level?: TDNotificationLevel;
    header?: string;
    content: string;
}