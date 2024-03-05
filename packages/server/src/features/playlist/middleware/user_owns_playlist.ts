import type { Request, Response, NextFunction } from 'express'

import { sessionGetUser } from 'features/authentication'
import playlistGet from '../services/playlist_get'
import type { APIStatus } from 'types'

/**
 * Middleware that checks if the user owns a playlist.
 * Checks for the playlist ID in the request body.
 * @param _req
 * @param _res
 * @param _next
 * @returns
 */
async function userOwnsPlaylist(
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

  const playlist = await playlistGet(_req.body.playlistid)
  if (playlist !== undefined && user !== playlist.user_id) {
    _res.status(403)
    _res.send({ status: 'failed' } as APIStatus)
    return
  }

  _next()
}

export default userOwnsPlaylist
