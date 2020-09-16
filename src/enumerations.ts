
export enum ABActionsTypes {
    ADD_TODO = 'Adding a todo',
    COMPLETE_TODO = 'Completing a todo',
    
    ADD_NOTIFICATION = 'Add a new notification',
    REMOVE_NOTIFICATION = 'Remove a notification',

    ADD_NODE = 'Add node',
    REMOVE_NODE = 'Remove node',
    CONNECT_WEBSOCKET = 'Connect the websocket',
    MESSAGE_RECEIVED = 'Received a message via the websocket'
}

export enum ABColors {
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

export enum ABNotificationLevel {
    INFO = 'Information notification',
    DANGER = 'Danger notification',
    SUCCESS = 'Success notification',
    WARNING = 'Warning notification',
}