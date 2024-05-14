import type { APIStatus } from 'types'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

/**
 * Submits a request to the server to move a playlist down one in the user's list.
 * @param _playlistId - The ID of the playlist to move down.
 * @returns The result of attempting to move the playlist down.
 */
async function submitPlaylistOrderDown(playlistId: string): Promise<APIStatus> {
  const [signal, clear] = netTimeout()
  let result: APIStatus

  try {
    const response = await fetch(
      `${process.env.VITE_API_URL}/api/playlist/edit/order/down/${playlistId}`,
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

export default submitPlaylistOrderDown
