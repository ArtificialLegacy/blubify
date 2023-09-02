import netTimeout from 'utility/net_timeout'
import type { SignupData } from '../types/signup_data'
import type { AuthResult } from 'features/authentication'
import SignupStatus from '../types/signup_status'

/**
 * Posts the signup form data to the api.
 * uses the /api/auth/signup endpoint
 * @param _data This signup form data to post
 * @returns {Promise<AuthResult>} The results from the api for account creation.
 *
 * @example
 *
 * const results: AuthResult = await signupSubmit(SignupData)
 *
 * signupSubmit(SignupData).then((results: AuthResult) => {})
 */
async function signupSubmit(_data: SignupData): Promise<AuthResult> {
  const [signal, clear] = netTimeout()
  let result: AuthResult

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(_data),
        signal,
      }
    )

    result = await response.json()
  } catch {
    result = { status: SignupStatus.Failed, session: '' }
  }

  clear()

  return result
}

export default signupSubmit
