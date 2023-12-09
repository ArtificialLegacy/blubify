import { Request, Response } from 'express'

import validatePlaylistEdit from '../validators/validate_edit_playlist'
import editPlaylistName from '../services/edit_playlist_name'
import GenericResult from 'types/generic_result'

async function data(_req: Request, _res: Response) {
  const valid = await validatePlaylistEdit(_req.body)
  if (!valid) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  await editPlaylistName(_req.params.playlistId, _req.body.name)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
}

export default data
