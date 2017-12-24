import { TDNotificationLevel } from './enumerations';

export interface INotification {
    level?: TDNotificationLevel;
    header?: string;
    content: string;
}