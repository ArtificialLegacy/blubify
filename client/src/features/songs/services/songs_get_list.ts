import netTimeout from 'utility/net_timeout'
import { Song } from '../types/song'
import cookieRead from 'utility/cookie_read'

async function songsGetList(_playlistID: string): Promise<Song[]> {
  if (_playlistID === undefined) return []

  const [signal, clear] = netTimeout()
  let result: Song[]

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/songs/list/${_playlistID}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
        signal,
      }
    )

    result = await response.json()
  } catch {
    result = []
  }

  clear()

  return result
}

export default songsGetList
