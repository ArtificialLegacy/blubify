import { Router } from 'express'

import { authUserCheck } from 'features/authentication'

import { router as editPlaylistRouter } from 'features/playlist_edit'

import create from './routes/create'
import list from './routes/list'

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

router.post('/create', create())
router.get('/list', list())

export default router
