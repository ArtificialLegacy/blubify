import type { Request, Response, NextFunction } from 'express'

import SessionStatus from '../types/session_status'
import checkSession from '../services/check_session'

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
  if (exists === SessionStatus.Valid) _next()
  else _res.sendStatus(403)
}

export default authUserCheck
