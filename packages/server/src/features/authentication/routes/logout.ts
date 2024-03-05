import { Request, Response } from 'express'

import sessionGetUser from '../services/session_get_user'
import logoutUser from '../services/logout_user'
import cullSessions from '../services/cull_sessions'
import { APIStatus } from 'types'

async function logout(_req: Request, _res: Response) {
  // authUserCheck middleware ensures that this is a valid user.
  const user = (await sessionGetUser(_res.locals.cookies?.session)) as number

  logoutUser(_res.locals.cookies?.session)
  cullSessions(user)

  _res.status(200)
  _res.send({ status: 'success' } as APIStatus)
}

export default logout
