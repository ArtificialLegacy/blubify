import netTimeout from 'utility/net_timeout'
import type { LoginData } from '../types/login_data'
import type { AuthResult } from 'features/authentication'
import LoginStatus from '../types/login_status'

/**
 * Posts the login form data to the api
 * uses the /api/auth/login endpoint
 * @param _data The form data to post
 * @returns {Promise<AuthResult>} The results of if the login attempt succeeded.
 *
 * @example
 *
 * const result: AuthResult = await loginSubmit(LoginData)
 *
 * loginSubmit(LoginData).then((result: AuthResult) => {})
 */
async function loginSubmit(_data: LoginData): Promise<AuthResult> {
  const [signal, clear] = netTimeout()
  let result: AuthResult

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
    result = { status: LoginStatus.Failed, session: '' }
  }

  clear()

  return result
}

export default loginSubmit
