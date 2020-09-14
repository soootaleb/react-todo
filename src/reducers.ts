import initial from './states';
import { TDActionsTypes as AT, TDTodoCategory } from './enumerations';

const map = {};

map[AT.ADD_TODO] = (state, action) => ({
    ...state,
    todos: [...state.todos, action.payload]
});

map[AT.COMPLETE_TODO] = (state, action) => ({
    ...state,
    todos: [...state.todos.filter(todo => todo !== action.payload), {
        ...action.payload,
        category: action.payload.category === TDTodoCategory.TODO ?
            TDTodoCategory.DOING : action.payload.category === TDTodoCategory.DOING ?
                TDTodoCategory.DONE : TDTodoCategory.NULL
    }]
});

map[AT.ADD_NOTIFICATION] = (state, action) => ({
    ...state,
    notifications: [...state.notifications, action.payload]
});

map[AT.REMOVE_NOTIFICATION] = (state, action) => ({
    ...state,
    notifications: state.notifications.filter(notification => notification !== action.payload)
});

map[AT.MESSAGE_RECEIVED] = (state, action) => ({
    ...state,
    nodes: {
        ...state.nodes,
        [action.payload.nodePort]: {
            ...state.nodes[action.payload.nodePort],
            messages: [...state.nodes[action.payload.nodePort], action.payload.message]
        }
    }
});

export default (state = initial, action) => {
    if (Object.keys(map).indexOf(action.type) > - 1) {
        return map[action.type](state, action);
    } else {
        return state;
    }
};