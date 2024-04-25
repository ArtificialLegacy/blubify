import { Request, Response } from 'express'

import songGetName from '../services/song_get_name'

function name(
  deps = {
    songGetName,
  }
) {
  return async (_req: Request, _res: Response) => {
    const name = await deps
      .songGetName(Number(_req.params.entryId))
      .catch(() => {
        _res.status(404)
        return ''
      })

    _res.status(200)
    _res.send({ name })
  }
}

export default name
