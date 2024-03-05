import type { APIStatus } from 'types'
import netTimeout from 'utility/net_timeout'
import type { PlaylistEditData } from 'types'
import cookieRead from 'utility/cookie_read'

/**
 * Submits new data to the server for editing a playlist.
 * @param _playlistId - The ID of the playlist to edit.
 * @param _data - The data to be submitted to the server for editing the playlist.
 * @returns The result of editing the playlist.
 *
 * @example
 *
 * const result = await editPlaylist(playlistId, data)
 *
 * editPlaylist(playlistId, data).then((_result) => console.log(_result))
 */
async function submitPlaylistEdit(
  _playlistId: string,
  _data: PlaylistEditData
): Promise<APIStatus> {
  const [signal, clear] = netTimeout()
  let result: APIStatus

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/playlist/edit/data/${_playlistId}`,
      {
        method: 'PATCH',
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
    result = { status: 'failed' }
  }

  clear()

  return result
}

export default submitPlaylistEdit
