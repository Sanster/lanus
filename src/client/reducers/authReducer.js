import * as types from '../actions/actionTypes'
import initialState from './initialState'

const authReducer = (state = initialState.authed, action) => {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return true
    default:
      return state
  }
}

export default authReducer
