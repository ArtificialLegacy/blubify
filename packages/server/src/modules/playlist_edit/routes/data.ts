import { Request, Response } from 'express'

import { validatePlaylistEdit } from 'validators'
import editPlaylistName from '../services/edit_playlist_name'
import type { APIStatus } from 'types'

function data(
  deps = {
    editPlaylistName,
  }
) {
  return async (_req: Request, _res: Response) => {
    const valid = await validatePlaylistEdit(_req.body)
    if (!valid) {
      _res.status(400)
      _res.send({ status: 'invalid_request' } as APIStatus)
      return
    }

    await deps.editPlaylistName(_req.params.playlistId, _req.body.name)

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default data
