import type { Request, Response, NextFunction } from 'express'

import { sessionGetUser } from 'modules/authentication'
import type { APIStatus } from 'types'
import playlistGetUser from '../services/playlist_get_user'

/**
 * Middleware that checks if the user owns a playlist.
 * Checks for the playlist ID in the request body.
 * @param _req
 * @param _res
 * @param _next
 * @returns
 */
async function userOwnsPlaylist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await sessionGetUser(res.locals.cookies?.session)
  if (user === undefined || user === null) {
    res.status(403)
    res.send({ status: 'failed' } as APIStatus)
    return
  }

  const id =
    req.body.playlistid ??
    req.body.playlistId ??
    req.body.id ??
    req.params.playlistId ??
    req.fields?.playlist?.[0]

  const playlistUser = await playlistGetUser(id)
  if (playlistUser === undefined || user !== playlistUser) {
    res.status(403)
    res.send({ status: 'failed' } as APIStatus)
    return
  }

  next()
}

export default userOwnsPlaylist
