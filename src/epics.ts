import { combineEpics } from 'redux-observable';
import { TDActionsTypes } from './enumerations';
import { removeNotification } from './actions';

const removeNotificationEpic = (action, store) => {
    return action.ofType(TDActionsTypes.ADD_NOTIFICATION)
        .delay(3000)
        .map(o => removeNotification(o.payload));
};

export default combineEpics(...[
    removeNotificationEpic,
]);
