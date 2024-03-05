import e, { Request, Response } from 'express'

import sessionGetUser from '../services/session_get_user'
import logoutUser from '../services/logout_user'
import cullSessions from '../services/cull_sessions'
import type { APIStatus } from 'types'

async function sessionInvalidate(_req: Request, _res: Response) {
  // authUserCheck middleware ensures that this is a valid user.
  const user = (await sessionGetUser(_res.locals.cookies?.session)) as number
  const user2 = (await sessionGetUser(_req.params.sessionId)) as number

  if (user !== user2) {
    _res.status(403)
    _res.send({ status: 'invalid_request' } as APIStatus)
    return
  }

  logoutUser(_req.params.sessionId)
  cullSessions(user)

  _res.status(200)
  _res.send({ status: 'success' } as APIStatus)
}

export default sessionInvalidate
