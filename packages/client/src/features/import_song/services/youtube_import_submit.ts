import type { APIResult } from 'types'
import type { YoutubeImportData } from 'types'
import netTimeout from 'utility/net_timeout'
import cookieRead from 'utility/cookie_read'

/**
 * submit data to the api for a youtube import
 * @param _data the data to submit to the api to attempt to import a youtube video.
 * @returns The result returned from the api on the youtube import
 *
 * @example
 *
 * const result: GenericResult = await youtubeImportData(YoutubeImportData)
 */
async function youtubeImportSubmit(
  _data: YoutubeImportData
): Promise<APIResult> {
  const [signal, clear] = netTimeout()
  let result: APIResult

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/songs/create/youtube`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${cookieRead('session')}`,
        },
        body: JSON.stringify(_data),
        signal,
      }
    )

    result = (await response.json()).status
  } catch {
    result = 'failed'
  }

  clear()

  return result
}

export default youtubeImportSubmit
