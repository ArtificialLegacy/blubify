import GenericResult from 'types/generic_result'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

async function submitDeleteSong(_entryId: number): Promise<GenericResult> {
  const [signal, clear] = netTimeout()
  let result: GenericResult

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/songs/edit/delete/${_entryId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
        signal,
      }
    )

    result = (await response.json()).status
  } catch {
    result = GenericResult.Failed
  }

  clear()

  return result
}

export default submitDeleteSong
