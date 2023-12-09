import { Request, Response } from 'express'

import songCreateShare from '../services/song_create_share'
import GenericResult from 'types/generic_result'
import validateShareImport from '../validators/validate_share_import'

async function shared(_req: Request, _res: Response) {
  if (!(await validateShareImport(_req.body))) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  const success = await songCreateShare(_req.body)

  if (!success) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  _res.status(200)
  _res.send({ status: GenericResult.Success })
}

export default shared
