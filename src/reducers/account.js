import axios from 'axios';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const SET_USER_INFO = 'SET_USER_INFO'
export const CLEAR_LOGIN_INFO = 'CLEAR_LOGIN_INFO'

export const setAuthTokenAction = token => ({
  type: SET_AUTH_TOKEN,
  payload: {
    token,
  }
})

export const setUserInfoAction = userInfo => ({
  type: SET_USER_INFO,
  payload: {
    userInfo,
  }
})

export const clearLoginInfoAction = () => ({
  type: CLEAR_LOGIN_INFO,
})

const getAuthToken = () => {
  let token = localStorage.getItem("token")
  if ( null !== token) {
    axios.defaults.headers.common['Authorization'] = `${token}`
  }
  return token
}

const saveAuthToken = authToken => {
  if ( null !== authToken) {
    axios.defaults.headers.common['Authorization'] = `${authToken}`
    localStorage.setItem( "token", authToken)
  }
  else {
    axios.defaults.headers.common['Authorization'] = undefined
    localStorage.removeItem( "token")
  }
}

const initialState = {
  authToken: getAuthToken(),
  userInfo: {},
}

export default function accountReducer(state = initialState, action) {
  switch( action.type) {
    case SET_AUTH_TOKEN:
      saveAuthToken( action.payload.token)
      return {
        ...state,
        authToken: action.payload.token,
      }
    case CLEAR_LOGIN_INFO:
      saveAuthToken(null)
      return {
        ...state,
        authToken: null,
      }
    case SET_USER_INFO: return {
      ...state,
      userInfo: action.payload.userInfo,
    }
    default:
      return state
  }
}