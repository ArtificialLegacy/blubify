import netTimeout from 'utility/net_timeout'
import cookieRead from 'utility/cookie_read'
import type { APIStatus } from 'types'

/**
 * Submits a request to the server to delete a playlist.
 * @param _playlistId - The id of the playlist to be deleted.
 * @returns The status of the request to delete the playlist.
 *
 * @example
 * const result = await deletePlaylist(playlistId)
 *
 * deletePlaylist(playlistId).then((_result) => console.log(_result))
 */
async function submitPlaylistDelete(_playlistId: string): Promise<APIStatus> {
  const [signal, clear] = netTimeout()
  let result: APIStatus

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/playlist/edit/delete/${_playlistId}`,
      {
        method: 'DELETE',
        headers: {
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

export default submitPlaylistDelete
