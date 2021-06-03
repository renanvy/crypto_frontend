function getSessionToken() {
  return window.localStorage.getItem('sessionToken')
}

export { getSessionToken }
