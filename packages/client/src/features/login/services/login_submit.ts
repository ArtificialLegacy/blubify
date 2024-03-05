import netTimeout from 'utility/net_timeout'
import type { LoginData, LoginStatus } from 'types'

/**
 * Posts the login form data to the api
 * uses the /api/auth/login endpoint
 * @param _data The form data to post
 * @returns {Promise<LoginStatus>} The results of if the login attempt succeeded.
 *
 * @example
 *
 * const result: LoginStatus = await loginSubmit(LoginData)
 *
 * loginSubmit(LoginData).then((result: AuthResult) => {})
 */
async function loginSubmit(_data: LoginData): Promise<LoginStatus> {
  const [signal, clear] = netTimeout()
  let result: LoginStatus

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(_data),
        signal,
      }
    )

    result = await response.json()
  } catch {
    result = { status: 'failed', session: '' }
  }

  clear()

  return result
}

export default loginSubmit
