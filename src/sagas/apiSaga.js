import { takeLatest, call, put, all, delay, take } from 'redux-saga/effects'
import axios from 'axios';
import { doLog, generateApiURL, showError, showSuccess } from '../services';
import { API } from '../constants';
import { startAPICallAction, finishAPICallAction } from '../reducers/apiCall';
import HttpStatus from 'http-status-codes';
import { setAuthTokenAction, setUserInfoAction, clearLoginInfoAction } from '../reducers/account';
import { history } from '../reducers';

function* callAPI( api, apiCallParams = {}, apiURLParams) {
  yield put(startAPICallAction(api.ID))

  let result = {}

  try {
    const apiURL = generateApiURL( api.URL, apiURLParams)
    const { data } = yield call( axios, {
      method: api.METHOD,
      url: apiURL,
      data: apiCallParams,
    })

    result.status = HttpStatus.OK
    result.data = data
    result.message = "Success"

  } catch( err) {
    if ( API.LOGOUT.ID != api.ID) {
      const { response } = err
      if ( undefined === response) {
        result.message = "Can not connect to the server."
        result.status = HttpStatus.SERVICE_UNAVAILABLE
  
        showError( result.message)
      } else {
        result.status = response.status
        result.message = response.statusText
  
        let errMsg = ""
  
        switch( response.status) {
          case HttpStatus.UNAUTHORIZED:
          case HttpStatus.FORBIDDEN:
            errMsg = "Session is expired.\nPlease login."
            break
          case HttpStatus.INTERNAL_SERVER_ERROR:
          case HttpStatus.NOT_FOUND:
            errMsg = "Error occured.\nPlease contact administrator."
            break
          case HttpStatus.BAD_REQUEST: {
            const data = response.data
            if ( undefined === data)
              errMsg = response.statusText
            else
              errMsg = data
            break
          }
        }
  
        if ( "" !== errMsg)
          showError( errMsg)
  
        yield put(SagaLogoutAction())
      }
    }
  }

  yield put(finishAPICallAction(api.ID, result.status, result.message))
  return result
}

// Actions
export const SagaLoginAction = (username, password) => ({
  type: API.LOGIN.ID,
  payload: {
    username,
    password,
  }
})

export const SagaLogoutAction = () => ({
  type: API.LOGOUT.ID,
})

export const SagaGetUserInfoAction = () => ({
  type: API.USER_INFO.ID,
})

export const SagaUpdateUserInfoAction = (type, identity) => ({
  type: API.UPDATE_INFO.ID,
  payload: {
    type,
    identity,
  }
})

// Saga Effects
function* loginEffect(action) {
  const { data, status } = yield callAPI( API.LOGIN, action.payload)

  if (HttpStatus.OK === status) {
    yield put(setAuthTokenAction(data.access_token))
    history.push("/")
    yield put(SagaGetUserInfoAction())
  }
}

function* logoutEffect() {
  yield callAPI(API.LOGOUT)
  yield put(clearLoginInfoAction())

  history.push("/")
}

function* getUserInfoEffect(action) {
  const { data, status } = yield callAPI( API.USER_INFO)

  if (HttpStatus.OK === status) {
    yield put(setUserInfoAction(data))
  }
}

function* updateUserInfoEffect(action) {
  const { data, status } = yield callAPI( API.UPDATE_INFO, action.payload)

  if (HttpStatus.OK === status) {
    showSuccess("Caller ID has been changed successfully")
    //yield put(SagaGetUserInfoAction())
  }
}

export default function* apiSaga() {
  yield all([
    takeLatest(API.LOGIN.ID, loginEffect),
    takeLatest(API.LOGOUT.ID, logoutEffect),
    takeLatest(API.USER_INFO.ID, getUserInfoEffect),
    takeLatest(API.UPDATE_INFO.ID, updateUserInfoEffect),
  ])
}