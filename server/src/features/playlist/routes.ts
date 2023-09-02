import { Router } from 'express'

import { authUserCheck } from 'features/authentication'
import playlistCreate from './services/playlist_create'
import validatePlaylistCreateData from './validators/validate_playlist_create_data'
import PlaylistCreateResult from './types/playlist_create_result'
import playlistGetList from './services/playlist_get_list'
import { sessionGetUser } from 'features/authentication'
import { router as editPlaylistRouter } from 'features/playlist_edit'

/**
 * @middleware authUserCheck
 *
 * @endpoint '/create' - This endpoint is used to submit playlist creation data.
 * @endpoint '/list' - This endpoint is used for sending a list of playlists to the client.56
 *
 * @packageDocumentation
 */
const router = Router()

router.use(authUserCheck)

router.use('/edit', editPlaylistRouter)

router.post('/create', async (_req, _res) => {
  const valid = await validatePlaylistCreateData(_req.body)
  if (!valid) _res.send({ status: PlaylistCreateResult.InvalidRequest })

  const user = await sessionGetUser(_res.locals.cookies?.session)

  const created = await playlistCreate(_req.body, user)
  if (!created) _res.send({ status: PlaylistCreateResult.Failed })

  _res.send({ status: PlaylistCreateResult.Success })
})

router.get('/list', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  const playlists = await playlistGetList(user)

  _res.send(playlists)
})

export default router
