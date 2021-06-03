import httpClient from '../../gateway/http_request'
import { getSessionToken } from '../../helpers'

const Settings = {
  async list_currencies() {
    const path = '/api/v1/currencies'
    let headers = { Authorization: getSessionToken() }

    headers = httpClient.buildHeader(headers)

    const response = await httpClient.get(path, null, headers)
    return response
  },

  async update_currency(payload) {
    const path = '/api/v1/crypto/btc'
    let headers = { Authorization: getSessionToken() }

    headers = httpClient.buildHeader(headers)

    const response = await httpClient.patch(path, payload, headers)
    return response
  }
}

export default Settings
