import { Request, Response } from 'express'

import editSongOrder from '../services/edit_song_order'
import GenericResult from 'types/generic_result'
import { songGetCount, songEntryGet } from 'features/songs'
import type { SongEntry } from 'features/songs'

async function orderdown(_req: Request, _res: Response) {
  const entry = (await songEntryGet(Number(_req.params.entryId))) as SongEntry

  const songCount = await songGetCount(entry.playlist_id)
  if (entry.ordering === songCount - 1) {
    _res.status(400)
    _res.send({ status: GenericResult.Failed })
    return
  }

  await editSongOrder(Number(_req.params.entryId), entry.ordering + 1)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
}

export default orderdown
