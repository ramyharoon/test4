import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import apiCallReducer from './apiCall';
import loginReducer from './login';
import accountReducer from './account';
import homeReducer from './home';

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  router: connectRouter(history),
  apiState: apiCallReducer,
  login: loginReducer,
  account: accountReducer,
  home: homeReducer,
})

export default rootReducer