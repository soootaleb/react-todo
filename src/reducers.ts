import initial from './states';
import { ABActionsTypes as AT } from './enumerations';
import { IMessage, ITheme } from './interfaces';

const map = {};
let counter: number = 0;

const themes: ITheme[] = [
    { primary: '#3f51b5', secondary: '#5c6bc0', minor: '#7986cb', catchy: '#3d5afe' },
    { primary: '#e91e63', secondary: '#ec407a', minor: '#f06292', catchy: '#f50057' },
    { primary: '#ff9800', secondary: '#ffa726', minor: '#ffb74d', catchy: '#ff9100' },
    { primary: '#009688', secondary: '#26a69a', minor: '#4db6ac', catchy: '#1de9b6' },
    { primary: '#9c27b0', secondary: '#ab47bc', minor: '#ba68c8', catchy: '#d500f9' },
    { primary: '#2196f3', secondary: '#42a5f5', minor: '#64b5f6', catchy: '#2979ff' }
];

map[AT.ADD_NOTIFICATION] = (state, action) => ({
    ...state,
    notifications: [...state.notifications, action.payload]
});

map[AT.REMOVE_NOTIFICATION] = (state, action) => ({
    ...state,
    notifications: state.notifications.filter(notification => notification !== action.payload)
});

map[AT.MESSAGE_RECEIVED] = (state, action) => {
    const message: IMessage<{ message: IMessage<any> }> = action.payload;
    return {
        ...state,
        nodes: {
            ...state.nodes,
            [message.source]: {
                ...state.nodes[message.source],
                state: message.payload.message.type === 'uiStateUpdate' ?
                    { ...message.payload.message.payload } :
                    { ...state.nodes[message.source].state },
                messages: [
                    ...state.nodes[message.source].messages,
                    message.payload.message
                ]
            }
        }
    };
};

map[AT.ADD_NODE] = (state, action) => ({
    ...state,
    nodes: {
        ...state.nodes,
        [action.payload]: {
            state: {
                term: -1,
                state: 'not connected',
                peers: []
            },
            nodePort: action.payload,
            messages: [],
            theme: themes[counter++ % themes.length]
        }
    }
});

map[AT.REMOVE_NODE] = (state, action) => {
    let o = { ...state.nodes };
    delete o[action.payload];
    return {
        ...state,
        nodes: o
    };
};

export default (state = initial, action) => {
    if (Object.keys(map).indexOf(action.type) > - 1) {
        return map[action.type](state, action);
    } else {
        return state;
    }
};