import { Router } from 'express'

import { authUserCheck } from 'modules/authentication'
import { router as songCreateRouter } from 'modules/song_create'

import { userOwnsPlaylist } from 'modules/playlist'
import { router as songStreamRouter } from 'modules/song_stream'
import { router as songEditRouter } from 'modules/song_edit'
import userOwnsSong from './middleware/userOwnsSong'

import list from './routes/list'
import status from './routes/status'
import name from './routes/name'
import userAccessSong from './middleware/userAccessSong'

/**
 * @middleware authUserCheck
 * @middleware songCreateRouter
 * @middleware songStreamRouter
 *
 * @endpoint '/list/:playlistId' - Used to get a list of songs in a playlist. Uses the userOwnsPlaylist middleware.
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

router.get('/list/:playlistId', userOwnsPlaylist, list())
router.get('/status/:filepath', userAccessSong, status())
router.get('/name/:entryId', userOwnsSong, name())

export default router
