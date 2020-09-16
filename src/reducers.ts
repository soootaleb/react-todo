import initial from './states';
import { ABActionsTypes as AT } from './enumerations';
import { IMessage } from './interfaces';

const map = {};

map[AT.ADD_NOTIFICATION] = (state, action) => ({
    ...state,
    notifications: [...state.notifications, action.payload]
});

map[AT.REMOVE_NOTIFICATION] = (state, action) => ({
    ...state,
    notifications: state.notifications.filter(notification => notification !== action.payload)
});

map[AT.MESSAGE_RECEIVED] = (state, action) => {
    const message: IMessage<{message: IMessage}> = action.payload;
    return {
        ...state,
        nodes: {
            ...state.nodes,
            [message.source]: {
                ...state.nodes[message.source],
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
            nodePort: action.payload,
            messages: []
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