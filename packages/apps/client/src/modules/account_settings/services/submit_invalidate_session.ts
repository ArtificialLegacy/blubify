import type { APIStatus } from 'types'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

/**
 * Requests the server to invalidate a session token.
 * @param _sessionId - The ID of the session to invalidate.
 * @returns - The result of the request.
 */
async function submitInvalidateSession(_sessionId: string): Promise<APIStatus> {
  const [signal, clear] = netTimeout()
  let result: APIStatus

  try {
    const response = await fetch(
      `${process.env.VITE_API_URL}/api/auth/sessionInvalidate/${_sessionId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `${cookieRead('session')}`,
        },
        signal,
      }
    )
    result = await response.json()
  } catch {
    result = { status: 'failed' } as APIStatus
  }

  clear()

  return result
}

export default submitInvalidateSession
