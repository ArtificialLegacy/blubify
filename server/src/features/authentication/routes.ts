import { Router } from 'express'

import { router as loginRouter } from 'features/login'
import { router as signupRouter } from 'features/signup'
import authUserCheck from './middleware/is_user'

import session from './routes/session'
import sessionList from './routes/session_list'
import logout from './routes/logout'
import sessionInvalidate from './routes/session_invalidate'

/**
 * @middleware loginRouter
 * @middleware signupRouter
 *
 * @endpoint '/session' - Endpoint used for validating a login session.
 *
 * @packageDocumentation
 */
const router = Router()

router.get('/session', session)
router.get('/sessionList', authUserCheck, sessionList)
router.delete('/logout', authUserCheck, logout)
router.delete('/sessionInvalidate/:sessionId', authUserCheck, sessionInvalidate)

router.use(loginRouter)
router.use(signupRouter)

export default router
