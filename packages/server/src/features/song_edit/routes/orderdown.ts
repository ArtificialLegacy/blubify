import { Request, Response } from 'express'

import editSongOrder from '../services/edit_song_order'
import type { APIStatus } from 'types'
import { songGetCount, songEntryGet } from 'features/songs'
import type { SongEntry } from 'features/songs'

async function orderdown(_req: Request, _res: Response) {
  const entry = (await songEntryGet(Number(_req.params.entryId))) as SongEntry

  const songCount = await songGetCount(entry.playlist_id)
  if (entry.ordering === songCount - 1) {
    _res.status(400)
    _res.send({ status: 'failed' } as APIStatus)
    return
  }

  await editSongOrder(Number(_req.params.entryId), entry.ordering + 1)

  _res.status(200)
  _res.send({ status: 'success' } as APIStatus)
}

export default orderdown
