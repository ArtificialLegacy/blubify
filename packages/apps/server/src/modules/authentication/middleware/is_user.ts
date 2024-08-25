import type { Request, Response, NextFunction } from 'express'

import type { APIStatus, SessionStatus } from 'types'
import checkSession from '../services/check_session'
import sessionGetUser from '../services/session_get_user'

/**
 * Auth middleware for checking sessionid for a valid user.
 * @param _req  Express request
 * @param _res Express response
 * @param _next pass request onto next middleware / router
 *
 * @example
 *
 * app.use(authUserCheck)
 *
 * router.use(authUserCheck)
 */
async function authUserCheck(req: Request, res: Response, next: NextFunction) {
  const exists = await checkSession(res.locals.cookies?.session)
  if (exists !== 'valid') {
    res.status(403)
    res.send({ status: 'failed' } as APIStatus)
    return
  }

  const user = await sessionGetUser(res.locals.cookies?.session)
  if (user === undefined || user === null) {
    res.status(403)
    res.send({ status: 'failed' } as APIStatus)
    return
  }

  next()
}

export default authUserCheck
