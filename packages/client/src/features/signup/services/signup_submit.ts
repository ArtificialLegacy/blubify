import netTimeout from 'utility/net_timeout'
import type { SignupData } from '../types/signup_data'
import type { SignupStatus } from 'types'

/**
 * Posts the signup form data to the api.
 * uses the /api/auth/signup endpoint
 * @param _data This signup form data to post
 * @returns {Promise<SignupStatus>} The results from the api for account creation.
 *
 * @example
 *
 * const results: SignupStatus = await signupSubmit(SignupData)
 *
 * signupSubmit(SignupData).then((results: SignupStatus) => {})
 */
async function signupSubmit(_data: SignupData): Promise<SignupStatus> {
  const [signal, clear] = netTimeout()
  let result: SignupStatus

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
    result = { status: 'failed', session: '' }
  }

  clear()

  return result
}

export default signupSubmit
