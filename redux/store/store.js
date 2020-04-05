import { createStore } from 'redux';
import { rootReducers } from '../reducers/index';

import { composeWithDevTools } from 'redux-devtools-extension';
// const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducers, composeWithDevTools());
