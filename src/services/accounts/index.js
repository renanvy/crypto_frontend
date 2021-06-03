import httpClient from '../../gateway/http_request'

const Accounts = {
  async login(payload) {
    const path = '/api/v1/login'
    let headers = {}

    headers = httpClient.buildHeader(headers)

    const response = await httpClient.post(path, payload, headers)
    return response
  },

  logout() {
    localStorage.removeItem('sessionToken')

    window.location = '/login'
  }
}

export default Accounts
