import state from '../states';
import reducer from '../reducers';
import { TDActionsTypes, TDTodoCategory } from '../enumerations';
import { ITodo, INotification } from '../interfaces';

test('Reducer returns state without action specified', () => {
    expect(reducer({...state}, {type: undefined})).toEqual({
        todos: [],
        notifications: []
    });
});

test('Reducer adds a notification', () => {
    const notification: INotification = {
        content: 'MyNotification'
    };
    expect(reducer({...state}, {
        type: TDActionsTypes.ADD_NOTIFICATION,
        payload: notification
    })).toEqual({
        todos: [],
        notifications: [notification]
    });
});

test('Reducer removes a notification', () => {
    const notification: INotification = {
        content: 'MyNotification'
    };
    expect(reducer({
        ...state,
        notifications: [notification] as never
    }, {
        type: TDActionsTypes.REMOVE_NOTIFICATION,
        payload: notification
    })).toEqual({
        todos: [],
        notifications: []
    });
});

test('Reducer adds a todo', () => {
    const todo: ITodo = {
        label: 'MyTodo',
        category: TDTodoCategory.TODO
    };
    expect(reducer({...state}, {
        type: TDActionsTypes.ADD_TODO,
        payload: todo
    })).toEqual({
        todos: [todo],
        notifications: []
    });
});

test('Reducer moves a todo to doing', () => {
    const todo: ITodo = {
        label: 'MyTodo',
        category: TDTodoCategory.TODO
    };
    expect(reducer({
        ...state,
        todos: [todo] as never
    }, {
        type: TDActionsTypes.COMPLETE_TODO,
        payload: todo
    })).toEqual({
        todos: [{
            ...todo,
            category: TDTodoCategory.DOING
        }],
        notifications: []
    });
});

test('Reducer moves a doing to done', () => {
    const todo: ITodo = {
        label: 'MyTodo',
        category: TDTodoCategory.DOING
    };
    expect(reducer({
        ...state,
        todos: [todo] as never
    }, {
        type: TDActionsTypes.COMPLETE_TODO,
        payload: todo
    })).toEqual({
        todos: [{
            ...todo,
            category: TDTodoCategory.DONE
        }],
        notifications: []
    });
});

test('Reducer moves a done to null', () => {
    const todo: ITodo = {
        label: 'MyTodo',
        category: TDTodoCategory.DONE
    };
    expect(reducer({
        ...state,
        todos: [todo] as never
    }, {
        type: TDActionsTypes.COMPLETE_TODO,
        payload: todo
    })).toEqual({
        todos: [{
            ...todo,
            category: TDTodoCategory.NULL
        }],
        notifications: []
    });
});