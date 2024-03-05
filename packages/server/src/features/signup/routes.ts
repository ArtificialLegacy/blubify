import { Router } from 'express'

import signup from './routes/signup'

/**
 * @endpoint '/signup' - This is used for recieving user creation data
 *
 * @packageDocumentation
 */
const router = Router()

router.post('/signup', signup())

export default router
