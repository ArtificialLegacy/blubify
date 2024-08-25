import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

/**
 * Sends a request to the server to log out the current user.
 *
 * @example
 *
 * await logout()
 */
async function logout() {
  const [signal, clear] = netTimeout()
  await fetch(`${process.env.VITE_API_URL}/api/auth/logout`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${cookieRead('session')}`,
    },
    signal,
  })
  clear()
}

export default logout
