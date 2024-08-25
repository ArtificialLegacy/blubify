import type { APIResult } from 'types'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

async function uploadImportSubmit(data: FormData): Promise<APIResult> {
  const [signal, clear] = netTimeout()
  let result: APIResult

  try {
    const response = await fetch(
      `${process.env.VITE_API_URL}/api/songs/create/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `${cookieRead('session')}`,
        },
        body: data,
        signal,
      }
    )

    result = (await response.json()).status
  } catch {
    result = 'failed'
  }

  clear()

  return result
}

export default uploadImportSubmit
