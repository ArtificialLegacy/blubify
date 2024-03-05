import { Request, Response } from 'express'

import songCreateShare from '../services/song_create_share'
import validateShareImport from '../validators/validate_share_import'
import type { APIStatus } from 'types'

async function shared(_req: Request, _res: Response) {
  if (!(await validateShareImport(_req.body))) {
    _res.status(400)
    _res.send({ status: 'invalid_request' } as APIStatus)
    return
  }

  const success = await songCreateShare(_req.body)

  if (!success) {
    _res.status(400)
    _res.send({ status: 'failed' } as APIStatus)
    return
  }

  _res.status(200)
  _res.send({ status: 'success' } as APIStatus)
}

export default shared
