import { Router } from 'express'

import { router as signupRouter } from 'modules/signup'
import { router as loginRouter } from 'modules/login'
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
 * @endpoint '/sessionList' - Endpoint used for getting a list of all active sessions.
 * @endpoint '/logout' - Endpoint used for logging out of a session.
 * @endpoint '/sessionInvalidate/:sessionId' - Endpoint used for invalidating a session.
 *
 * @packageDocumentation
 */
const router = Router()

router.get('/session', session())
router.get('/sessionList', authUserCheck, sessionList())
router.delete('/logout', authUserCheck, logout())
router.delete(
  '/sessionInvalidate/:sessionId',
  authUserCheck,
  sessionInvalidate()
)

router.use(signupRouter)
router.use(loginRouter)

export default router
