import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import {routerMiddleware} from 'react-router-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import saga from '../saga';

export default function configureStore(history) {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware, logger);
  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(saga);

  return store;
}
