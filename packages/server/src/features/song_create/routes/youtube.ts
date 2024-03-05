import { Request, Response } from 'express'

import validateYoutubeImport from '../validators/validate_youtube_import'
import songCreateYoutube from '../services/song_create_youtube'
import { APIStatus } from 'types'

async function youtube(_req: Request, _res: Response) {
  if (!(await validateYoutubeImport(_req.body))) {
    _res.status(400)
    _res.send({ status: 'invalid_request' } as APIStatus)
    return
  }

  songCreateYoutube(_req.body)

  _res.status(200)
  _res.send({ status: 'success' } as APIStatus)
}

export default youtube
