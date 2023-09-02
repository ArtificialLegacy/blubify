import GenericResult from 'types/generic_result'
import netTimeout from 'utility/net_timeout'
import type { ShareImportData } from '../types/share_data_import'
import cookieRead from 'utility/cookie_read'

async function shareImportSubmit(
  _data: ShareImportData
): Promise<GenericResult> {
  const [signal, clear] = netTimeout()
  let result: GenericResult

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
    result = GenericResult.Failed
  }

  clear()

  return result
}

export default shareImportSubmit
