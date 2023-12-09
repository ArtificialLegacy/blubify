import { Request, Response } from 'express'

import editSongName from '../services/edit_song_name'
import validateSongNameEdit from '../validators/validate_song_edit_name'
import GenericResult from 'types/generic_result'

async function name(_req: Request, _res: Response) {
  if (!(await validateSongNameEdit(_req.body.name))) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  const success = await editSongName(
    Number(_req.params.entryId),
    _req.body.name
  )

  if (!success) {
    _res.status(500)
    _res.send({ status: GenericResult.Failed })
    return
  }

  _res.status(200)
  _res.send({ status: GenericResult.Success })
}

export default name
