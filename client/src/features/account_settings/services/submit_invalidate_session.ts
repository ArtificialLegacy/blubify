import GenericResult from 'types/generic_result'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

/**
 * Requests the server to invalidate a session token.
 * @param _sessionId - The ID of the session to invalidate.
 * @returns - The result of the request.
 */
async function submitInvalidateSession(
  _sessionId: string
): Promise<{ status: GenericResult }> {
  const [signal, clear] = netTimeout()
  let result: { status: GenericResult }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/sessionInvalidate/${_sessionId}`,
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
    result = { status: GenericResult.Failed }
  }

  clear()

  return result
}

export default submitInvalidateSession
