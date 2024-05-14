import type { Request, Response, NextFunction } from 'express'

import { sessionGetUser } from 'modules/authentication'
import type { APIStatus } from 'types'
import songEntryGetFile from '../services/song_entry_get_file'
import songEntryGet from '../services/song_entry_get'
import songEntryGetUser from '../services/song_entry_get_user'

async function userAccessSong(req: Request, res: Response, next: NextFunction) {
  const user = await sessionGetUser(res.locals.cookies?.session)
  if (user === undefined || user === null) {
    res.status(403)
    res.send({ status: 'failed' } as APIStatus)
    return
  }

  const songEntry = await songEntryGetFile(req.params.filepath)

  for (const entry of songEntry ?? []) {
    const song = await songEntryGet(entry)
    const songUser = await songEntryGetUser(entry)

    if (song === undefined || songUser === undefined) {
      res.status(403)
      res.send({ status: 'failed' } as APIStatus)
      return
    }

    if (songUser === user) {
      next()
      return
    }
  }

  res.status(403)
  res.send({ status: 'failed' } as APIStatus)
}

export default userAccessSong
