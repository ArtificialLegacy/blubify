import netTimeout from 'utility/net_timeout'
import type { Song } from 'types'
import cookieRead from 'utility/cookie_read'

async function songsGetList(playlistId: string): Promise<Song[]> {
  if (playlistId === undefined) return []

  const [signal, clear] = netTimeout()
  let result: Song[]

  try {
    const response = await fetch(
      `${process.env.VITE_API_URL}/api/songs/list/${playlistId}`,
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
  } catch (err) {
    result = []
  }

  clear()

  return result
}

export default songsGetList
