import { Router } from 'express'

import { authUserCheck } from 'features/authentication'
import editRoute from './routes/edit'

/**
 * @middleware authUserCheck
 *
 * @endpoint '/edit' - Endpoint used for updating user settings.
 *
 * @packageDocumentation
 */
const router = Router()

router.use(authUserCheck)

router.put('/edit', editRoute)

export default router
