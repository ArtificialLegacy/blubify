import { Router } from 'express'

import stream from './routes/stream'
import thumbnail from './routes/thumbnail'

/**
 * @endpoint '/:filepath' - Endpoint to stream an audio file to the client.
 *
 * @packageDocumentation
 */
const router = Router()

router.get('/:filepath', stream())
router.get('/thumbnail/:filepath', thumbnail())

export default router
