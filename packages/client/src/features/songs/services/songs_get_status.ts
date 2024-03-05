import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

async function songGetStatus(_filepath: string): Promise<boolean> {
  const [signal, clear] = netTimeout()
  let result: boolean

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/songs/status/${_filepath}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
        signal,
      }
    )

    result = (await response.json()).status
  } catch {
    result = false
  }

  clear()

  return result
}

export default songGetStatus
