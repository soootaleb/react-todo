import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Observable } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';

import ABApplication from './containers/ABApplication';

import epics from './epics';
import reducers from './reducers';

const epicMiddleware = createEpicMiddleware(epics, {
    dependencies: { ajax: Observable.ajax } // For testing
});

const w: any = window;
const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)));

ReactDOM.render(<Provider store={store}><ABApplication/></Provider>, document.getElementById('root') as HTMLElement);
