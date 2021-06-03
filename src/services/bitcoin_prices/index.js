import { getSessionToken } from '../../helpers'
import httpClient from '../../gateway/http_request'

const BitcoinPrices = {
  async get() {
    const path = '/api/v1/crypto/btc'
    let headers = { Authorization: getSessionToken() }

    headers = httpClient.buildHeader(headers)

    const response = await httpClient.get(path, null, headers)
    return response
  }
}

export default BitcoinPrices
