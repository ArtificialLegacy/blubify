import netTimeout from 'utility/net_timeout'
import GenericResult from 'types/generic_result'
import cookieRead from 'utility/cookie_read'

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
async function submitPlaylistDelete(
  _playlistId: string
): Promise<{ status: GenericResult }> {
  const [signal, clear] = netTimeout()
  let result: { status: GenericResult }

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
    result = { status: GenericResult.Failed }
  }

  clear()

  return result
}

export default submitPlaylistDelete
