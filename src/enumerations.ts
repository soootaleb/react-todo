export enum TDActionsTypes {
    ADD_TODO = 'Adding a todo',
    COMPLETE_TODO = 'Completing a todo',
    
    ADD_NOTIFICATION = 'Add a new notification',
    REMOVE_NOTIFICATION = 'Remove a notification',
}

export enum TDColors {
    PRIMARY = '#9C27B0',
    SECONDARY = '#BA68C8',
    MINOR = '#E1BEE7',
    CATCHY = '#AA00FF',

    BLACK = '#000000',
    WHITE = '#FFFFFF',

    DANGER = '#FF5252',
    SUCCESS = '#B2FF59',
    WARNING = '#FFFF00',
}

export enum TDNotificationLevel {
    INFO = 'Information notification',
    DANGER = 'Danger notification',
    SUCCESS = 'Success notification',
    WARNING = 'Warning notification',
}

export enum TDTodoCategory {
    TODO = 'To do',
    DOING = 'Doing',
    DONE = 'Done'
}