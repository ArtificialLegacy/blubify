import e, { Request, Response } from 'express'

import sessionGetUser from '../services/session_get_user'
import logoutUser from '../services/logout_user'
import cullSessions from '../services/cull_sessions'
import type { APIStatus } from 'types'

function sessionInvalidate(
  deps = {
    sessionGetUser,
    logoutUser,
    cullSessions,
  }
) {
  return async (_req: Request, _res: Response) => {
    // authUserCheck middleware ensures that this is a valid user.
    const user = (await deps.sessionGetUser(
      _res.locals.cookies?.session
    )) as number
    const user2 = (await deps.sessionGetUser(_req.params.sessionId)) as number

    if (user !== user2) {
      _res.status(403)
      _res.send({ status: 'invalid_request' } as APIStatus)
      return
    }

    deps.logoutUser(_req.params.sessionId)
    deps.cullSessions(user)

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default sessionInvalidate
