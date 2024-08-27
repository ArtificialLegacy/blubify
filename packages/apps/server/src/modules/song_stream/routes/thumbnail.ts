import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'

function thumbnail() {
  return async (_req: Request, _res: Response) => {
    if (_req.params.filepath.length < 0 || _req.params.filepath.length > 36)
      _res.sendStatus(400)

    const pth = path.join(
      process.cwd(),
      `${process.env.SONG_STORE}${_req.params.filepath}.webp`
    )

    const f = await fs
      .stat(pth)
      .then(() => true)
      .catch(() => false)

    if (!f) {
      _res.sendFile(path.join(process.cwd(), './public/unknown.svg'))
    } else {
      _res.sendFile(pth)
    }
  }
}

export default thumbnail
