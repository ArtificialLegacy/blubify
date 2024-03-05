import type { Request, Response, NextFunction } from 'express'

import { sessionGetUser } from 'features/authentication'
import type { APIStatus } from 'types'
import songEntryGetUser from '../services/song_entry_get_user'

/**
 * Middleware to check if the user the song entry they are trying to access
 * @param _req
 * @param _res
 * @param _next
 */
async function userOwnsSong(
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

  const songUser = await songEntryGetUser(Number(_req.params.entryId))
  if (songUser === undefined || songUser === null || songUser !== user) {
    _res.status(403)
    _res.send({ status: 'failed' } as APIStatus)
    return
  }

  _next()
}

export default userOwnsSong
