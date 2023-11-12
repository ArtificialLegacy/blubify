import type { Request, Response, NextFunction } from 'express'

import { sessionGetUser } from 'features/authentication'
import GenericResult from 'types/generic_result'
import playlistGet from '../services/playlist_get'

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
    _res.send({ status: GenericResult.Failed })
    return
  }

  const playlist = await playlistGet(_req.body.playlistid)
  if (playlist !== undefined && user !== playlist.user_id) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  _next()
}

export default userOwnsPlaylist
