import { Request, Response } from 'express'

import GenericResult from 'types/generic_result'
import editSongOrder from '../services/edit_song_order'
import { songEntryGet } from 'features/songs'

async function orderup(_req: Request, _res: Response) {
  const entry = await songEntryGet(Number(_req.params.entryId))
  if (entry === undefined || entry === null) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  if (entry.ordering === 0) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  await editSongOrder(Number(_req.params.entryId), entry.ordering - 1)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
}

export default orderup
