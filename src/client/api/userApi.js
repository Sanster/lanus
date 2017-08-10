class UserApi {
  static requestHeaders() {
    return { AUTHORIZATION: `Bearer ${sessionStorage.jwt}` }
  }

  static getAllCats() {
    const headers = this.requestHeaders()
    const request = new Request("/users", {
      method: "GET",
      headers: headers
    })

    return fetch(request)
      .then(response => {
        return response.json()
      })
      .catch(error => {
        return error
      })
  }
}

export default UserApi
