import { Router } from 'express'

import stream from './routes/stream'

/**
 * @endpoint '/:filepath' - Endpoint to stream an audio file to the client.
 *
 * @packageDocumentation
 */
const router = Router()

router.get('/:filepath', stream())

export default router
