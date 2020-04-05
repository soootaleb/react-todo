import { combineEpics } from 'redux-observable';
import { TDNotificationLevel, TDActionsTypes } from './enumerations';
import { removeNotification, addNotification, setSuggestion } from './actions';
import { Observable } from 'rxjs';
import { ISuggestion } from './interfaces';

const removeNotificationEpic = (action, store) => {
    return action.ofType(TDActionsTypes.ADD_NOTIFICATION)
        .delay(3000)
        .map(o => removeNotification(o.payload));
};

const submitRequestEpic = (action, store) => {
    return action.ofType(TDActionsTypes.SET_REQUEST)
        .switchMap(o => {
            return Observable.ajax({
                url: 'https://python.yoyobro.wtf:3000/',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(o.payload)
            }).map(response => {
                console.log(response.response)
                return setSuggestion(response.response as ISuggestion)
            });
        }).catch(error => {
            console.error(error)
            return Observable.of(addNotification({
                level: TDNotificationLevel.DANGER,
                header: 'Failed to send todo',
                content: error.toString()
            }));
        });
};

export default combineEpics(...[
    submitRequestEpic,
    removeNotificationEpic,
]);
