import e, { Request, Response } from 'express'

import { playlistGet, playlistGetCount } from 'features/playlist'
import type { APIStatus } from 'types'
import editPlaylistOrder from '../services/edit_playlist_order'

function orderdown(
  deps = {
    playlistGet,
    playlistGetCount,
    editPlaylistOrder,
  }
) {
  return async (_req: Request, _res: Response) => {
    // playlist is guranteed to be valid because of userOwnsPlaylist
    const playlist = (await deps.playlistGet(_req.params.playlistId)) as {
      ordering: number
      user_id: number
    }

    const playlistCount = await deps.playlistGetCount(playlist.user_id)

    if (playlist.ordering === playlistCount - 1) {
      _res.status(400)
      _res.send({ status: 'invalid_request' } as APIStatus)
      return
    }

    await deps.editPlaylistOrder(_req.params.playlistId, playlist.ordering + 1)

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default orderdown
