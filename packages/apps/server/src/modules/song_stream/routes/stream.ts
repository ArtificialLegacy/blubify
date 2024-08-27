import { Request, Response } from 'express'
import fs from 'fs'

function stream() {
  return async (_req: Request, _res: Response) => {
    if (_req.params.filepath.length < 0 || _req.params.filepath.length > 36)
      _res.sendStatus(400)

    const path = `${process.env.SONG_STORE}${_req.params.filepath}.webm`

    const stream = fs.createReadStream(path)
    const stat = fs.statSync(path)

    _res.set('Content-Type', 'audio/webm')
    _res.set('Accept-Ranges', 'bytes')
    _res.set('Content-Length', '' + stat.size)

    stream.on('data', (_chunk) => {
      _res.write(_chunk)
    })

    stream.on('error', () => {
      _res.sendStatus(404)
    })

    stream.on('end', () => {
      _res.end()
    })
  }
}

export default stream
