export const SET_CUSTOMER_TYPE = 'SET_CUSTOMER_TYPE'
export const SET_CUSTOMER_ID = 'SET_CUSTOMER_ID'
export const SET_DATA_FROM_USERINFO = 'SET_DATA_FROM_USERINFO'

export const setCustomerTypeAction = type => ({
  type: SET_CUSTOMER_TYPE,
  payload: {
    type,
  }
})

export const setCustomerIdAction = id => ({
  type: SET_CUSTOMER_ID,
  payload: {
    id,
  }
})

export const setDataFromUserInfo = (type, identity) => ({
  type: SET_DATA_FROM_USERINFO,
  payload: {
    type,
    identity,
  }
})

const initialState = {
  type: 'def',
  id: '',
}

export default function homeReducer(state = initialState, action) {
  switch(action.type) {
    case SET_CUSTOMER_TYPE: return {
      ...state,
      type: action.payload.type,
    }
    case SET_CUSTOMER_ID: return {
      ...state,
      id: action.payload.id,
    }
    case SET_DATA_FROM_USERINFO:
      let type = action.payload.type
      let identity = action.payload.identity
      let rtype = '^' === type ? 'def' : ('+' === identity ? 'no' : 'cus')
      return {
        ...state,
        type: rtype,
        id: ('cus' === rtype ? identity : '')
      }
    default:
      return state
  }
}