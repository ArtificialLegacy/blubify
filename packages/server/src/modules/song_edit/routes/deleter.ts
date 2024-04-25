import { Request, Response } from 'express'
import type { APIStatus } from 'types'
import deleteSong from '../services/delete_song'

function deleter(
  deps = {
    deleteSong,
  }
) {
  return async (_req: Request, _res: Response) => {
    const success = await deps
      .deleteSong(Number(_req.params.entryId))
      .catch(() => false)

    if (!success) {
      _res.status(500)
      _res.send({ status: 'failed' } as APIStatus)
    }

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default deleter
