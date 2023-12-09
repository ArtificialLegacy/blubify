import e, { Request, Response } from 'express'

import { playlistGet, playlistGetCount } from 'features/playlist'
import GenericResult from 'types/generic_result'
import editPlaylistOrder from '../services/edit_playlist_order'

async function orderdown(_req: Request, _res: Response) {
  // playlist is guranteed to be valid because of userOwnsPlaylist
  const playlist = (await playlistGet(_req.params.playlistId)) as {
    ordering: number
    user_id: number
  }

  const playlistCount = await playlistGetCount(playlist.user_id)

  if (playlist.ordering === playlistCount - 1) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  await editPlaylistOrder(_req.params.playlistId, playlist.ordering + 1)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
}

export default orderdown
