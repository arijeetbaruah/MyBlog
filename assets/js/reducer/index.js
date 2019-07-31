import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import SkillReducer from './skill';

const reducers = combineReducers({
    SkillReducer,
});

const middleware = applyMiddleware(thunk, Logger, promise);

const store = createStore(reducers, middleware);

export default store;
