import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

async function songGetName(_entryId: number): Promise<string> {
  const [signal, clear] = netTimeout()
  let result: string

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/songs/name/${_entryId}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
        signal,
      }
    )

    result = (await response.json()).name
  } catch {
    result = ''
  }

  clear()

  return result
}

export default songGetName
