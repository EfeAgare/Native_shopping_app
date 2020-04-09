import { createStore, applyMiddleware } from 'redux';
import { rootReducers } from '../reducers/index';
import ReduxThunk from 'redux-thunk';

// import { composeWithDevTools } from 'redux-devtools-extension';
// const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducers, applyMiddleware(ReduxThunk));
