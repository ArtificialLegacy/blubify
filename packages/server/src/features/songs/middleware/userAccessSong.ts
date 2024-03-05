import type { Request, Response, NextFunction } from 'express'

import { sessionGetUser } from 'features/authentication'
import type { APIStatus } from 'types'
import songEntryGetFile from '../services/song_entry_get_file'
import songEntryGet from '../services/song_entry_get'
import songEntryGetUser from '../services/song_entry_get_user'

async function userAccessSong(
  _req: Request,
  _res: Response,
  _next: NextFunction
) {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: 'failed' } as APIStatus)
    return
  }

  const songEntry = await songEntryGetFile(_req.params.filepath)

  for (const entry of songEntry ?? []) {
    const song = await songEntryGet(entry.entryId)
    const songUser = await songEntryGetUser(entry.entryId)
    if (song === undefined || songUser === undefined) {
      _res.status(403)
      _res.send({ status: 'failed' } as APIStatus)
      return
    }

    if (songUser === user) {
      _next()
      return
    }
  }

  _res.status(403)
  _res.send({ status: 'failed' } as APIStatus)
}

export default userAccessSong
