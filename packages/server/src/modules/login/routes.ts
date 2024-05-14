import { Router } from 'express'

import login from './routes/login'

/**
 * @endpoint '/login' - This is used for posting user login data
 *
 * @packageDocumentation
 */
const router = Router()

router.post('/login', login())

export default router
