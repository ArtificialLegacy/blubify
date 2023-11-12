import { Router } from 'express'

import { sessionGetUser, authUserCheck } from 'features/authentication'
import { songEntryGetUser, songGetCount } from 'features/songs'
import GenericResult from 'types/generic_result'
import editSongName from './services/edit_song_name'
import validateSongNameEdit from './validators/validate_song_edit_name'
import editSongOrder from './services/edit_song_order'
import deleteSong from './services/delete_song'

/**
 * @middleware authUserCheck
 *
 * @endpoint '/name/:entryId' - Used to edit the name of a song entry.
 * @endpoint '/order/up/:entryId' - Used to move a song entry up in the playlist.
 * @endpoint '/order/down/:entryId' - Used to move a song entry down in the playlist.
 * @endpoint '/delete/:entryId' - Used to delete a song entry.
 *
 * @packageDocumentation
 */
const router = Router()
router.use(authUserCheck)

router.patch('/name/:entryId', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const songUser = await songEntryGetUser(Number(_req.params.entryId))
  if (songUser !== user) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  if (!(await validateSongNameEdit(_req.body.name))) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  const success = await editSongName(
    Number(_req.params.entryId),
    _req.body.name
  )

  _res.status(success ? 200 : 500)
  _res.send({ status: GenericResult.Success })
})

router.patch('/order/up/:entryId', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const songUser = await songEntryGetUser(Number(_req.params.entryId))
  if (songUser !== user) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const entry = await globalThis.db
    .selectFrom('songentries')
    .select('ordering')
    .where('entry_id', '=', Number(_req.params.entryId))
    .executeTakeFirst()

  if (entry.ordering === 0) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  await editSongOrder(Number(_req.params.entryId), entry.ordering - 1)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
})

router.patch('/order/down/:entryId', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const songUser = await songEntryGetUser(Number(_req.params.entryId))
  if (songUser !== user) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const entry = await globalThis.db
    .selectFrom('songentries')
    .select(['ordering', 'playlist_id'])
    .where('entry_id', '=', Number(_req.params.entryId))
    .executeTakeFirst()

  const songCount = await songGetCount(entry.playlist_id)

  if (entry.ordering === songCount - 1) {
    _res.status(400)
    _res.send({ status: GenericResult.Failed })
    return
  }

  await editSongOrder(Number(_req.params.entryId), entry.ordering + 1)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
})

router.delete('/delete/:entryId', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const songUser = await songEntryGetUser(Number(_req.params.entryId))
  if (songUser !== user) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const success = await deleteSong(Number(_req.params.entryId))
  if (!success) {
    _res.status(500)
    _res.send({ status: GenericResult.Failed })
  }

  _res.status(200)
  _res.send({ status: GenericResult.Success })
})

export default router
