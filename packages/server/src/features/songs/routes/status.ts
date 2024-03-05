import { Request, Response } from 'express'

import songGetStatus from '../services/song_get_status'

async function status(_req: Request, _res: Response) {
  const status = await songGetStatus(_req.params.filepath).catch(() => {
    _res.status(404)
    return ''
  })

  _res.status(200)
  _res.send({ status })
}

export default status
