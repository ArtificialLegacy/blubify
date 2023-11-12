import { Router } from 'express'

import { authUserCheck, sessionGetUser } from 'features/authentication'
import { playlistGet, playlistGetCount } from 'features/playlist'
import GenericResult from 'types/generic_result'
import editPlaylistOrder from './services/edit_playlist_order'
import validatePlaylistEdit from './validators/validate_edit_playlist'
import editPlaylistName from './services/edit_playlist_name'
import deletePlaylist from './services/delete_playlist'

/**
 * @middleware authUserCheck
 *
 * @endpoint '/data/:playlistId' - This endpoint is used to submit playlist edit data.
 * @endpoint '/delete/:playlistId' - This endpoint is used to delete a playlist.
 * @endpoint '/order/up/:playlistId' - This endpoint is used to move a playlist up in the list.
 * @endpoint '/order/down/:playlistId' - This endpoint is used to move a playlist down in the list.
 *
 * @packageDocumentation
 */
const router = Router()
router.use(authUserCheck)

router.patch('/data/:playlistId', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const playlist = await playlistGet(_req.params.playlistId)
  if (playlist === undefined || playlist === null) {
    _res.status(404)
    _res.send({ status: GenericResult.Failed })
    return
  }

  if (playlist.user_id !== user) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const valid = await validatePlaylistEdit(_req.body)
  if (!valid) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  await editPlaylistName(_req.params.playlistId, _req.body.name)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
})

router.delete('/delete/:playlistId', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const playlist = await playlistGet(_req.params.playlistId)
  if (playlist === undefined || playlist === null) {
    _res.status(404)
    _res.send({ status: GenericResult.Failed })
    return
  }

  if (playlist.user_id !== user) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  await deletePlaylist(_req.params.playlistId)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
})

router.patch('/order/up/:playlistId', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const playlist = await playlistGet(_req.params.playlistId)
  if (playlist === undefined || playlist === null) {
    _res.status(404)
    _res.send({ status: GenericResult.Failed })
    return
  }

  if (playlist.user_id !== user) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  if (playlist.ordering === 0) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  await editPlaylistOrder(_req.params.playlistId, playlist.ordering - 1)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
})

router.patch('/order/down/:playlistId', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const playlist = await playlistGet(_req.params.playlistId)
  if (playlist === undefined || playlist === null) {
    _res.status(404)
    _res.send({ status: GenericResult.Failed })
    return
  }

  if (playlist.user_id !== user) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
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
})

export default router
