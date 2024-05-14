import type { APIResult } from 'types'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

async function submitDeleteSong(_entryId: number): Promise<APIResult> {
  const [signal, clear] = netTimeout()
  let result: APIResult

  try {
    const response = await fetch(
      `${process.env.VITE_API_URL}/api/songs/edit/delete/${_entryId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
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

export default submitDeleteSong
