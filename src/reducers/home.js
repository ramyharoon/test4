export const SET_CUSTOMER_TYPE = 'SET_CUSTOMER_TYPE'
export const SET_CUSTOMER_ID = 'SET_CUSTOMER_ID'

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
    default:
      return state
  }
}