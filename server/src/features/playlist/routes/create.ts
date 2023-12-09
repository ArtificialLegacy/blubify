import { Request, Response } from 'express'

import playlistCreate from '../services/playlist_create'
import validatePlaylistCreateData from '../validators/validate_playlist_create_data'
import PlaylistCreateResult from '../types/playlist_create_result'
import { sessionGetUser } from 'features/authentication'

async function create(_req: Request, _res: Response) {
  const valid = await validatePlaylistCreateData(_req.body)
  if (!valid) _res.send({ status: PlaylistCreateResult.InvalidRequest })

  // user is guaranteed to be valid because of authUserCheck
  const user = await sessionGetUser(_res.locals.cookies?.session) as number

  const created = await playlistCreate(_req.body, user)
  if (!created) _res.send({ status: PlaylistCreateResult.Failed })

  _res.send({ status: PlaylistCreateResult.Success })
}

export default create