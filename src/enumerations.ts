export enum TDActionsTypes {
    ADD_TODO = 'Adding a todo',
    COMPLETE_TODO = 'Completing a todo',
    
    ADD_NOTIFICATION = 'Add a new notification',
    REMOVE_NOTIFICATION = 'Remove a notification',
    
    SET_REQUEST = 'Set the requested resources',
    SET_SUGGESTION = 'Set the returned suggestion',
}

export enum TDColors {
    PRIMARY = '#9C27B0',
    SECONDARY = '#BA68C8',
    MINOR = '#9383e9',
    CATCHY = '#5036db',

    BLACK = '#000000',
    WHITE = '#FFFFFF',

    DANGER = '#FF5252',
    SUCCESS = '#2DA94D',
    WARNING = '#F8952A',
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
    DONE = 'Done',
    NULL = 'Null todo',
}