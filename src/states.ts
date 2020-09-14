import { IState } from './interfaces';

export default {
    nodes: {
        'abcd': {
            nodePort: '8080',
            messages: [
                { type: 'firstMessage', source: '8080', 'destination': 'ui', payload: {} },
                { type: 'firstMessage', source: '8080', 'destination': 'ui', payload: {} },
                { type: 'firstMessage', source: '8080', 'destination': 'ui', payload: {} },
                { type: 'firstMessage', source: '8080', 'destination': 'ui', payload: {} }
            ]
        }
    },
    todos: [],
    notifications: [],
} as IState;