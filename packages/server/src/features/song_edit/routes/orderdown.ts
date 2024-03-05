import { Request, Response } from 'express'

import editSongOrder from '../services/edit_song_order'
import type { APIStatus } from 'types'
import { songGetCount, songEntryGet } from 'features/songs'
import type { SongEntry } from 'types'

function orderdown(
  deps = {
    songEntryGet,
    songGetCount,
    editSongOrder,
  }
) {
  return async (_req: Request, _res: Response) => {
    const entry = (await deps.songEntryGet(
      Number(_req.params.entryId)
    )) as SongEntry

    const songCount = await deps.songGetCount(entry.playlist_id)
    if (entry.ordering === songCount - 1) {
      _res.status(400)
      _res.send({ status: 'failed' } as APIStatus)
      return
    }

    await deps.editSongOrder(Number(_req.params.entryId), entry.ordering + 1)

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default orderdown
