import { Request, Response } from 'express'

import { playlistGet, playlistGetUser } from 'modules/playlist'
import type { APIStatus } from 'types'
import editPlaylistOrder from '../services/edit_playlist_order'

function orderup(
  deps = {
    playlistGet,
    editPlaylistOrder,
    playlistGetUser,
  }
) {
  return async (_req: Request, _res: Response) => {
    // playlist is guranteed to be valid because of userOwnsPlaylist
    const playlist = await deps.playlistGet(_req.params.playlistId)
    const user = (await deps.playlistGetUser(_req.params.playlistId)) as number

    if (playlist === undefined || playlist.ordering === 0) {
      _res.status(400)
      _res.send({ status: 'invalid_request' } as APIStatus)
      return
    }

    await deps.editPlaylistOrder(
      user,
      _req.params.playlistId,
      playlist.ordering - 1
    )

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default orderup
