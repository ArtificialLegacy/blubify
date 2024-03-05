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
async function authUserCheck(
  _req: Request,
  _res: Response,
  _next: NextFunction
) {
  const exists = await checkSession(_res.locals.cookies?.session)
  if (exists !== 'valid') {
    _res.status(403)
    _res.send({ status: 'failed' } as APIStatus)
    return
  }

  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: 'failed' } as APIStatus)
    return
  }

  _next()
}

export default authUserCheck
