import { Router } from 'express'

import { authUserCheck, sessionGetUser } from 'features/authentication'
import { router as songCreateRouter } from 'features/song_create'
import songGetList from './services/song_get_list'
import { playlistGet } from 'features/playlist'
import songGetStatus from './services/song_get_status'
import songGetName from './services/song_get_name'
import { router as songStreamRouter } from 'features/song_stream'
import { router as songEditRouter } from 'features/song_edit'

/**
 * @middleware authUserCheck
 * @middleware songCreateRouter
 * @middleware songStreamRouter
 *
 * @endpoint '/list/:playlistId' - Used to get a list of songs in a playlist.
 * @endpoint '/status/:filepath' - Used to get the import status of a song.
 * @endpoint '/name/:entryId' - Used to get the name of a song entry.
 *
 * @packageDocumentation
 */
const router = Router()

router.use('/stream', songStreamRouter)

router.use(authUserCheck)

router.use('/create', songCreateRouter)
router.use('/edit', songEditRouter)

router.get('/list/:playlistId', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)

  const playlist = await playlistGet(_req.params.playlistId)
  if (playlist?.user_id !== user) return _res.sendStatus(403)

  const songs = await songGetList(_req.params.playlistId)

  _res.send(songs)
})

router.get('/status/:filepath', async (_req, _res) => {
  const status = await songGetStatus(_req.params.filepath).catch(() => {
    _res.status(404)
    return ''
  })

  _res.send({ status })
})

router.get('/name/:entryId', async (_req, _res) => {
  const name = await songGetName(Number(_req.params.entryId)).catch(() => {
    _res.status(404)
    return ''
  })
  _res.send({ name })
})

export default router
