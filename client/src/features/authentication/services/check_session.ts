import netTimeout from 'utility/net_timeout'
import SessionStatus from '../types/session_status'
import type { UserData } from '../types/user_data'
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
    result = { status: SessionStatus.Invalid, user: null }
  }

  clear()

  return result
}

export default checkSession
