import netTimeout from 'utility/net_timeout'
import { Playlist } from '../types/playlist'
import cookieRead from 'utility/cookie_read'

async function playlistGetList(): Promise<Playlist[]> {
  const [signal, clear] = netTimeout()
  let result: Playlist[]

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/playlist/list`,
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

export default playlistGetList
