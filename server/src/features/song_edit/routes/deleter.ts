import { Request, Response } from 'express'

import GenericResult from 'types/generic_result'
import deleteSong from '../services/delete_song'

async function deleter(_req: Request, _res: Response) {
  const success = await deleteSong(Number(_req.params.entryId))

  if (!success) {
    _res.status(500)
    _res.send({ status: GenericResult.Failed })
  }

  _res.status(200)
  _res.send({ status: GenericResult.Success })
}

export default deleter
