import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const enhancers = [];

const isDev = process.env.NODE_ENV === 'development';

if (isDev && typeof window !== 'undefined' && window.devToolsExtension) {
  enhancers.push(window.devToolsExtension());
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
