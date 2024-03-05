import { Request, Response } from 'express'

import deletePlaylist from '../services/delete_playlist'
import type { APIStatus } from 'types'

async function deleter(_req: Request, _res: Response) {
  await deletePlaylist(_req.params.playlistId)

  _res.status(200)
  _res.send({ status: 'success' } as APIStatus)
}

export default deleter
