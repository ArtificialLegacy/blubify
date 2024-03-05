import type { APIStatus } from 'types'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

/**
 * Submits a request to the server to move a playlist down one in the user's list.
 * @param _playlistId - The ID of the playlist to move down.
 * @returns The result of attempting to move the playlist down.
 *
 * @example
 * const result = await movePlaylistDown(playlistId)
 *
 * movePlaylistDown(playlistId).then((_result) => console.log(_result))
 */
async function submitPlaylistOrderDown(
  _playlistId: string
): Promise<APIStatus> {
  const [signal, clear] = netTimeout()
  let result: APIStatus

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/playlist/edit/order/down/${_playlistId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
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
