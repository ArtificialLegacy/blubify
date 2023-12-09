import { Request, Response } from "express";

import playlistGetList from '../services/playlist_get_list'
import { sessionGetUser } from 'features/authentication'

async function list(_req: Request, _res: Response) {
  // user is guaranteed to be valid because of authUserCheck
  const user = await sessionGetUser(_res.locals.cookies?.session) as number
  const playlists = await playlistGetList(user)

  _res.send(playlists)
}

export default list