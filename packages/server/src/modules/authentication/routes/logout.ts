import { Request, Response } from 'express'

import sessionGetUser from '../services/session_get_user'
import logoutUser from '../services/logout_user'
import cullSessions from '../services/cull_sessions'
import { APIStatus } from 'types'

function logout(
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

    deps.logoutUser(_res.locals.cookies?.session)
    deps.cullSessions(user)

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default logout
