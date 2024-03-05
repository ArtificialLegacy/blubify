import netTimeout from 'utility/net_timeout'
import type { Session } from 'types'
import cookieRead from 'utility/cookie_read'

/**
 * Gets a list of sessions attributed to the user.
 * @returns The list of sessions.
 *
 * @example
 * const sessions = await getSessions()
 *
 * getSessions().then((_sessions) => console.log(_sessions)))
 */
async function getSessionList(): Promise<Session[]> {
  const [signal, clear] = netTimeout()
  let result: Session[]

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/sessionList`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
        signal,
      }
    )

    result = await response.json()
  } catch {
    result = []
  }

  clear()

  return result
}

export default getSessionList
