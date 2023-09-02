import { Router } from 'express'

import checkSession from './services/check_session'
import { router as loginRouter } from 'features/login'
import { router as signupRouter } from 'features/signup'
import sessionGetUserData from './services/session_get_user_data'
import sessionGetUser from './services/session_get_user'
import SessionStatus from './types/session_status'
import GenericResult from 'types/generic_result'
import logoutUser from './services/logout_user'
import cullSessions from './services/cull_sessions'
import sessionGetList from './services/session_get_list'

/**
 * @middleware loginRouter
 * @middleware signupRouter
 *
 * @endpoint '/session' - Endpoint used for validating a login session.
 *
 * @packageDocumentation
 */
const router = Router()

router.get('/session', async (_req, _res) => {
  const result = await checkSession(_res.locals.cookies?.session)
  const user = await sessionGetUserData(_res.locals.cookies?.session)

  _res.status(200)
  _res.send({ status: result, user: user })
})

router.get('/sessionList', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  const sessions = await sessionGetList(user)

  _res.status(200)
  _res.send(sessions)
})

router.delete('/logout', async (_req, _res) => {
  const result = await checkSession(_res.locals.cookies?.session)
  if (result === SessionStatus.Invalid) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  logoutUser(_res.locals.cookies?.session)
  cullSessions(user)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
})

router.delete('/sessionInvalidate/:sessionId', async (_req, _res) => {
  const result = await checkSession(_res.locals.cookies?.session)
  if (result === SessionStatus.Invalid) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

  logoutUser(_req.params.sessionId)
  cullSessions(user)

  _res.status(200)
  _res.send({ status: GenericResult.Success })
})

router.use(loginRouter)
router.use(signupRouter)

export default router
