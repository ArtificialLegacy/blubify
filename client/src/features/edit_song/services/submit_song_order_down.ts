import GenericResult from 'types/generic_result'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

async function submitSongOrderDown(
  _entryId: number
): Promise<{ status: GenericResult }> {
  const [signal, clear] = netTimeout()
  let result: { status: GenericResult }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/songs/edit/order/down/${_entryId}`,
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
    result = { status: GenericResult.Failed }
  }

  clear()

  return result
}

export default submitSongOrderDown
