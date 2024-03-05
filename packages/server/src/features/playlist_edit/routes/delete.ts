import { Request, Response } from 'express'

import deletePlaylist from '../services/delete_playlist'
import type { APIStatus } from 'types'

function deleter(
  deps = {
    deletePlaylist,
  }
) {
  return async (_req: Request, _res: Response) => {
    await deps.deletePlaylist(_req.params.playlistId)

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default deleter
