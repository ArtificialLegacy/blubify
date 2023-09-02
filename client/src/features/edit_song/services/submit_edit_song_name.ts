import GenericResult from 'types/generic_result'
import netTimeout from 'utility/net_timeout'
import type { EditSongNameData } from '../types/edit_song_name_data'
import cookieRead from 'utility/cookie_read'

/**
 * Sends a request to the server to edit the song name.
 * @param _data The data to send to the server
 * @param _entryId The id of the song entry
 * @returns GenericResult for the status of the request
 */
async function editNameSongSubmit(
  _data: EditSongNameData,
  _entryId: number
): Promise<GenericResult> {
  const [signal, clear] = netTimeout()
  let result: GenericResult

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/songs/edit/name/${_entryId}`,
      {
        method: 'PATCH',
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

export default editNameSongSubmit
