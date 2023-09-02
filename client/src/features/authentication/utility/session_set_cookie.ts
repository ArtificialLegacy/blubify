/**
 * Creates a new session id cookie.
 * @param _sessionid The session id to store in a cookie
 *
 * @example
 *
 * sessionSetCookie('uuidStringHere')
 */
function sessionSetCookie(_sessionid: string) {
  const today = new Date()
  const expire = new Date()

  //! 7 is for days, should be changed in the future
  // the large number is for ms in a day
  expire.setTime(today.getTime() + 86400000 * 7)

  document.cookie = `session=${_sessionid}; expires=${expire.toUTCString()}; secure; SameSite=Strict`
}

export default sessionSetCookie
