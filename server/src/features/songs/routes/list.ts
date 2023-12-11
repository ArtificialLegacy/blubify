import { Request, Response } from 'express'

import songGetList from '../services/song_get_list'

async function list(_req: Request, _res: Response) {
  const songs = await songGetList(_req.params.playlistId)

  _res.status(200)
  _res.send(songs)
}

export default list
