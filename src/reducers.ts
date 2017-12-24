import initial from './states';
import { TDActionsTypes as AT } from './enumerations';

const map = {};

map[AT.ADD_NOTIFICATION] = (state, action) => ({
    ...state,
    notifications: [...state.notifications, action.payload]
});

map[AT.REMOVE_NOTIFICATION] = (state, action) => ({
    ...state,
    notifications: state.notifications.filter(notification => notification !== action.payload)
});

export default (state = initial, action) => {
    if (action.type in Object.keys(map)) {
        return map[action.type](state, action);
    } else {
        return state;
    }
};