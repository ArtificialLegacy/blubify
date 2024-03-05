import type { APIStatus } from 'types'
import netTimeout from 'utility/net_timeout'

import type { GeneralAccountSettings } from '../types/general_account_settings'
import cookieRead from 'utility/cookie_read'

/**
 * Submits the account settings to the server.
 * @param _data - The account settings to submit.
 * @returns - The result of the api call.
 */
async function submitGeneralAccountSettings(
  _data: GeneralAccountSettings
): Promise<APIStatus> {
  const [signal, clear] = netTimeout()
  let result: APIStatus

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/accountSettings/edit`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
        body: JSON.stringify(_data),
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

export default submitGeneralAccountSettings
