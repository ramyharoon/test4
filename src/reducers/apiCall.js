import { API_CALL_STATE_CALLING, API_CALL_STATE_SUCCESS, API_CALL_STATE_FAILURE } from "../constants"
import HttpStatus from 'http-status-codes'

const START_API_CALL = 'START_API_CALL'
const FINISH_API_CALL = 'FINISH_API_CALL'

export const startAPICallAction = apiName => ({
  type: START_API_CALL,
  payload: {
    apiName
  }
})

export const finishAPICallAction = (apiName, statusCode, statusText) => ({
  type: FINISH_API_CALL,
  payload: {
    apiName,
    statusCode,
    statusText,
  }
})

export default function apiCallReducer( state = {}, action) {
  switch ( action.type) {
    case START_API_CALL:
      return {
        ...state,
        [action.payload.apiName]: {
          state: API_CALL_STATE_CALLING
        }
      }
    case FINISH_API_CALL:

      return {
        ...state,
        [action.payload.apiName]: {
          state: (HttpStatus.OK === action.payload.statusCode ? API_CALL_STATE_SUCCESS : API_CALL_STATE_FAILURE),
          statusCode: action.payload.statusCode,
          statusText: action.payload.statusText,
        }
      }
    default:
      return state
  }
}