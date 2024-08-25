import { Router } from 'express'

import { authUserCheck } from 'modules/authentication'
import { userOwnsPlaylist } from 'modules/playlist'
import formidableParse from 'middleware/formidable_parse'

import youtube from './routes/youtube'
import upload from './routes/upload'
import shared from './routes/shared'

/**
 * @middleware authUserCheck
 * @middlewware userOwnsPlaylist
 *
 * @endpoint '/youtube' - Used to submit a youtube song import.
 * @endpoint '/upload' - Used to submit an audio file.
 * @endpoint '/shared' - Used to add an already existing song from a different playlist to another playlist.
 *
 * @packageDocumentation
 */
const router = Router()
router.use(authUserCheck)

router.post('/youtube', userOwnsPlaylist, youtube())
router.post('/upload', formidableParse, userOwnsPlaylist, upload())
router.post('/shared', userOwnsPlaylist, shared())

export default router
