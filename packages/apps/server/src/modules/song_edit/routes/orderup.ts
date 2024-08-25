import { Request, Response } from 'express'

import type { APIStatus } from 'types'
import editSongOrder from '../services/edit_song_order'
import { songEntryGet } from 'modules/songs'

function orderup(
  deps = {
    songEntryGet,
    editSongOrder,
  }
) {
  return async (_req: Request, _res: Response) => {
    const entry = await deps.songEntryGet(Number(_req.params.entryId))
    if (entry === undefined || entry === null) {
      _res.status(400)
      _res.send({ status: 'invalid_request' } as APIStatus)
      return
    }

    if (entry.ordering === 0) {
      _res.status(400)
      _res.send({ status: 'invalid_request' } as APIStatus)
      return
    }

    await deps.editSongOrder(Number(_req.params.entryId), entry.ordering - 1)

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default orderup
