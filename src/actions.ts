import { INotification, ITodo, IRequest, ISuggestion } from './interfaces';
import { TDActionsTypes } from './enumerations';

// TODO 
export const addTodo = (todo: object) => ({
    type: TDActionsTypes.ADD_TODO,
    payload: todo
});

export const completeTodo = (todo: ITodo) => ({
    type: TDActionsTypes.COMPLETE_TODO,
    payload: todo
});

// Application 
export const addNotification = (notification: INotification) => ({
    type: TDActionsTypes.ADD_NOTIFICATION,
    payload: notification
});

export const removeNotification = (notification: INotification) => ({
    type: TDActionsTypes.REMOVE_NOTIFICATION,
    payload: notification
});

// Suggestion

export const setRequest = (request: IRequest) => ({
    type: TDActionsTypes.SET_REQUEST,
    payload: request
});

export const setSuggestion = (suggestion: ISuggestion) => ({
    type: TDActionsTypes.SET_SUGGESTION,
    payload: suggestion
});