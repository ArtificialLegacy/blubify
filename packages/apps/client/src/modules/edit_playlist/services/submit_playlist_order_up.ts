import type { APIStatus } from 'types'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

/**
 * Submits a request to the server to move a playlist up one in the user's list.
 * @param _playlistId - The ID of the playlist to move up.
 * @returns The result of attempting to move the playlist up.
 */
async function submitPlaylistOrderUp(playlistId: string): Promise<APIStatus> {
  const [signal, clear] = netTimeout()
  let result: APIStatus

  try {
    const response = await fetch(
      `${process.env.VITE_API_URL}/api/playlist/edit/order/up/${playlistId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
        body: JSON.stringify({ id: playlistId }),
        signal,
      }
    )

    result = await response.json()
  } catch {
    result = { status: 'failed' }
  }

  clear()

  return result
}

export default submitPlaylistOrderUp
