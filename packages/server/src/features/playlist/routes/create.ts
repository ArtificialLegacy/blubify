import { Request, Response } from 'express'

import playlistCreate from '../services/playlist_create'
import validatePlaylistCreateData from '../validators/validate_playlist_create_data'
import { sessionGetUser } from 'features/authentication'
import type { APIStatus } from 'types'

function create(
  deps = {
    sessionGetUser,
    playlistCreate,
  }
) {
  return async (_req: Request, _res: Response) => {
    const valid = await validatePlaylistCreateData(_req.body)
    if (!valid) _res.send({ status: 'invalid_request' } as APIStatus)

    // user is guaranteed to be valid because of authUserCheck
    const user = (await deps.sessionGetUser(
      _res.locals.cookies?.session
    )) as number

    const created = await deps.playlistCreate(_req.body, user)
    if (!created) _res.send({ status: 'failed' } as APIStatus)

    _res.send({ status: 'success' } as APIStatus)
  }
}

export default create
