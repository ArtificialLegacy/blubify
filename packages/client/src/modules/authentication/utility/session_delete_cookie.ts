/**
 * Overwrites the browser cookie storing the session id information.
 *
 * @example
 * sessionDeleteCookie()
 */
function sessionDeleteCookie() {
  const today = new Date()
  const expire = new Date()

  expire.setTime(today.getTime() - 2 * 24 * 60 * 60 * 1000)

  document.cookie = `session=${''}; expires=${expire.toUTCString()}; secure; SameSite=Strict`
}

export default sessionDeleteCookie
