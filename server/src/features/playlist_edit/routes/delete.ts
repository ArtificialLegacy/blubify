import { Request, Response } from 'express'

import deletePlaylist from '../services/delete_playlist'
import GenericResult from 'types/generic_result'

async function deleter(_req: Request, _res: Response) {
  await deletePlaylist(_req.params.playlistId)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
}

export default deleter
