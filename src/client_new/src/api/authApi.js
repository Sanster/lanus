import axios from 'axios'

class AuthApi {
  static login(credentials) {
    return axios.post('/auth/login', credentials)
  }
}

export default AuthApi
