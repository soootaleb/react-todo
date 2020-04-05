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

export interface IRequest {
    cpu: number | null,
    ram: number | null,
    disk: number | null,
    gpu: number | null,
    virt: number | null,
    hdd: number | null,
    ssd: number | null
}

export interface ISuggestion {
    AWS: {
        category: string,
        product: string,
        properties: {
            cpu: number | null,
            ram: number | null,
            disk: number | null,
            gpu: number | null,
            virt: number | null,
            hdd: number | null,
            ssd: number | null
        }
    },
    SCW: {
        category: string,
        product: string,
        properties: {
            cpu: number | null,
            ram: number | null,
            disk: number | null,
            gpu: number | null,
            virt: number | null,
            hdd: number | null,
            ssd: number | null
        }
    }
}