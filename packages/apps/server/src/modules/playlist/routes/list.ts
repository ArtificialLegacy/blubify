import { Request, Response } from 'express'

import playlistGetList from '../services/playlist_get_list'
import { sessionGetUser } from 'modules/authentication'

function list(
  deps = {
    sessionGetUser,
    playlistGetList,
  }
) {
  return async (_req: Request, _res: Response) => {
    // user is guaranteed to be valid because of authUserCheck
    const user = (await deps.sessionGetUser(
      _res.locals.cookies?.session
    )) as number
    const playlists = await deps.playlistGetList(user)

    _res.send(playlists)
  }
}

export default list
