import { toast, Bounce, ToastPosition, ToastType } from 'react-toastify';
import { API_ROOT, API_CALL_STATE_CALLING } from '../constants';
import { SHOW_LOG } from '../config';

export const doLog = (...args) => {
  if ( SHOW_LOG)
    console.log( "LOG:", ...args)
}

export const createAPI = (ID, URL, METHOD) => ({
  ID,
  URL,
  METHOD,
})

export const generateApiURL = (url, urlParams) => {
  return API_ROOT + url
}

export const checkUIBlock = apiState => {
  if ( undefined === apiState)
    return false
  if ( API_CALL_STATE_CALLING === apiState.state)
    return true
  return false
}

const showToast = (type, msg) => {
  toast(msg, {
    transition: Bounce,
    closeButton: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    autoClose: 5000,
    position: ToastPosition.BOTTOM_CENTER,
    type: type,
  })
}

export const showError = msg => showToast( ToastType.ERROR, msg)
export const showSuccess = msg => showToast( ToastType.SUCCESS, msg)
export const showWarning = msg => showToast( ToastType.WARNING, msg)
export const showInformation = msg => showToast( ToastType.INFO, msg)