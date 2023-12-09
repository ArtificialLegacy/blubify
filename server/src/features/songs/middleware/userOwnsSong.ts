import type { Request, Response, NextFunction } from 'express'

import { sessionGetUser } from 'features/authentication'
import GenericResult from 'types/generic_result'
import songEntryGetUser from '../services/song_entry_get_user'

async function userOwnsSong(
  _req: Request,
  _res: Response,
  _next: NextFunction
) {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const songUser = await songEntryGetUser(Number(_req.params.entryId))
  if (songUser !== undefined && songUser !== user) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  _next()
}

export default userOwnsSong
