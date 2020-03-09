import { createAPI } from '../services';
import { BACK_END_URL } from '../config';

export const API_CALL_STATE_UNKNOWN = 0
export const API_CALL_STATE_CALLING = 1
export const API_CALL_STATE_SUCCESS = 2
export const API_CALL_STATE_FAILURE = 3

const HTTP_POST = 'POST'
const HTTP_GET = 'GET'
const HTTP_PUT = 'PUT'

export const API_ROOT = BACK_END_URL

export const API = {
  LOGIN: createAPI('LOGIN', '/login', HTTP_POST),
  LOGOUT: createAPI('LOGOUT', '/logout', HTTP_POST),
  USER_INFO: createAPI('USER_INFO', '/user_info', HTTP_GET),
  UPDATE_INFO: createAPI('UPDATE_INFO', '/update', HTTP_POST),
}