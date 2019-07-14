/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const enhancers = [];

const isDev = process.env.NODE_ENV === 'development';

if (isDev && typeof window !== 'undefined' && window.window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  )
);

export default store;
