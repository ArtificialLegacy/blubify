import type { APIResult } from 'types'
import netTimeout from 'utility/net_timeout'
import type { ShareImportData } from 'types'
import cookieRead from 'utility/cookie_read'

async function shareImportSubmit(_data: ShareImportData): Promise<APIResult> {
  const [signal, clear] = netTimeout()
  let result: APIResult

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/songs/create/shared`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
        body: JSON.stringify(_data),
        signal,
      }
    )

    result = (await response.json())?.status
  } catch {
    result = 'failed'
  }

  clear()

  return result
}

export default shareImportSubmit
