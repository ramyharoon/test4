import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import createSagaMiddleware from 'redux-saga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  let middlewares = applyMiddleware(sagaMiddleware)
  let store = createStore(
    rootReducer,
    compose(middlewares),
  )

  sagaMiddleware.run(rootSaga)
  
  return store;
}