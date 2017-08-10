import * as types from './actionTypes'
import authApi from '../api/authApi'

export function loginSuccess() {
  return { type: types.LOG_IN_SUCCESS }
}

export function logInUser(credentials) {
  return function(dispatch) {
    return authApi
      .login(credentials)
      .then(response => {
        sessionStorage.setItem('jwt', response.data.auth_token)
        dispatch(loginSuccess())
      })
      .catch(error => {
        throw error
      })
  }
}
