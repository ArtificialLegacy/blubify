import { Router } from 'express'

import { authUserCheck } from 'features/authentication'
import { userOwnsPlaylist } from 'features/playlist'
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
router.use(userOwnsPlaylist)

router.post('/youtube', youtube())
router.post('/upload', formidableParse, upload())
router.post('/shared', shared())

export default router
