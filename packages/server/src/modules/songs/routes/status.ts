import { Request, Response } from 'express'

import songGetStatus from '../services/song_get_status'

function status(
  deps = {
    songGetStatus,
  }
) {
  return async (_req: Request, _res: Response) => {
    const status = await deps.songGetStatus(_req.params.filepath).catch(() => {
      _res.status(404)
      return ''
    })

    _res.status(200)
    _res.send({ status })
  }
}

export default status
