import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from '../reducers';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        promise
    )
);
export default store;