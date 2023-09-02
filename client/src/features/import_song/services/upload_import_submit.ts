import GenericResult from 'types/generic_result'
import cookieRead from 'utility/cookie_read'
import netTimeout from 'utility/net_timeout'

async function uploadImportSubmit(_data: FormData): Promise<GenericResult> {
  const [signal, clear] = netTimeout()
  let result: GenericResult

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/songs/create/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `${cookieRead('session')}`,
        },
        body: _data,
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

export default uploadImportSubmit
