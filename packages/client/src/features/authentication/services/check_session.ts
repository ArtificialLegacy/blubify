import netTimeout from 'utility/net_timeout'
import type { SessionStatus, UserData } from 'types'
import cookieRead from 'utility/cookie_read'

async function checkSession(): Promise<{
  status: SessionStatus
  user: UserData | null
}> {
  const [signal, clear] = netTimeout()
  let result: { status: SessionStatus; user: UserData | null }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/session`,
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
    result = { status: 'invalid', user: null }
  }

  clear()

  return result
}

export default checkSession
