import type { APIResult } from 'types'
import type { PlaylistCreateData } from 'types'
import netTimeout from 'utility/net_timeout'
import cookieRead from 'utility/cookie_read'

/**
 * Submits playlist creation data to the api.
 * @param _data The playlist data to submit to the api.
 * @returns The result received from the api.
 *
 * @example
 * const result = await playlistSubmit(_data)
 *
 * result.then((_result) => console.log(_result))
 */
async function playlistSubmit(_data: PlaylistCreateData): Promise<APIResult> {
  const [signal, clear] = netTimeout()
  let result: APIResult

  try {
    const response = await fetch(
      `${process.env.VITE_API_URL}/api/playlist/create`,
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

    result = (await response.json()).status
  } catch {
    result = 'failed'
  }

  clear()

  return result
}

export default playlistSubmit
