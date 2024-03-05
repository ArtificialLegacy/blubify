import { Request, Response } from 'express'

import { playlistGet } from 'features/playlist'
import type { APIStatus } from 'types'
import editPlaylistOrder from '../services/edit_playlist_order'

async function orderup(_req: Request, _res: Response) {
  // playlist is guranteed to be valid because of userOwnsPlaylist
  const playlist = (await playlistGet(_req.params.playlistId)) as {
    ordering: number
  }

  if (playlist.ordering === 0) {
    _res.status(400)
    _res.send({ status: 'invalid_request' } as APIStatus)
    return
  }

  await editPlaylistOrder(_req.params.playlistId, playlist.ordering - 1)

  _res.status(200)
  _res.send({ status: 'success' } as APIStatus)
}

export default orderup
