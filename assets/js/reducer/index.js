import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Logger from 'redux-logger';

const middleware = applyMiddleware(thunk, Logger);

const store = createStore(null, middleware);
