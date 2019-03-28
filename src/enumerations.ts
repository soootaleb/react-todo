export enum TDActionsTypes {
    ADD_TODO = 'Adding a todo',
    COMPLETE_TODO = 'Completing a todo',
    
    ADD_NOTIFICATION = 'Add a new notification',
    REMOVE_NOTIFICATION = 'Remove a notification',

    CONNECT_WEBSOCKET = 'Connect the websocket',
    MESSAGE_RECEIVED = 'Received a message via the websocket'
}

export enum TDColors {
    PRIMARY = '#9C27B0',
    SECONDARY = '#BE2A33',
    MINOR = '#E3333E',
    CATCHY = '#BE2A33',

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