
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
    PRIMARY = '#607d8b',
    SECONDARY = '#78909c',
    MINOR = '#90a4ae',
    CATCHY = '#37474f',

    DARK  = '#121212',
    BLACK = '#000000',
    WHITE = '#FFFFFF',

    LEADER = '#ff5722',
    FOLLOWER = '#ffccbc',
    CANDIDATE = '#651fff',

    INFO = 'lightblue',
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