function RequestHeaderBuilder() {
  const DEFAULT_REQUEST_HEADER = {
    'Content-Type': 'application/json',
    accept: 'application/json'
  }

  function decorate(customRequestHeader = {}) {
    return { ...DEFAULT_REQUEST_HEADER, ...customRequestHeader }
  }

  return {
    buildHeader(headers) {
      return decorate(headers)
    }
  }
}

function RequestBuilder() {
  function normalizePath(path) {
    if (path.startsWith('/')) {
      return path.slice(1)
    }

    return path
  }

  function buildUrl(path) {
    return `http://localhost:4000/${normalizePath(path)}`
  }

  function buildBody(payload) {
    if (!payload) {
      return {}
    }

    return {
      body: JSON.stringify(payload)
    }
  }

  function build(path, method, payload, headers) {
    let options = {
      method,
      headers,
      mode: 'cors'
    }

    if (method !== 'GET') {
      options = { ...options, ...buildBody(payload) }
    }

    return fetch(buildUrl(path), options)
  }

  return {
    get(path, payload, headers) {
      return build(path, 'GET', payload, headers)
    },

    post(path, payload, headers) {
      return build(path, 'POST', payload, headers)
    },

    patch(path, payload, headers) {
      return build(path, 'PATCH', payload, headers)
    },

    delete(path, payload, headers) {
      return build(path, 'DELETE', payload, headers)
    }
  }
}

export default { ...RequestHeaderBuilder(), ...RequestBuilder() }
