import { combineReducers } from 'redux'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  authed: authReducer
})

export default rootReducer
