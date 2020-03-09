export const CHANGE_USERNAME_ACTION = 'CHANGE_USERNAME_ACTION'
export const CHANGE_PASSWORD_ACTION = 'CHANGE_PASSWORD_ACTION'

export const changeUsernameAction = username => ({
  type: CHANGE_USERNAME_ACTION,
  payload: {
    username,
  }
})

export const changePasswordAction = password => ({
  type: CHANGE_PASSWORD_ACTION,
  payload: {
    password,
  }
})

const initialState = {
  username: '',
  password: '',
}

export default function loginReducer(state = initialState, action) {
  switch( action.type) {
    case CHANGE_USERNAME_ACTION: return {
      ...state,
      username: action.payload.username
    }
    case CHANGE_PASSWORD_ACTION: return {
      ...state,
      password: action.payload.password
    }
    default:
      return state
  }
}