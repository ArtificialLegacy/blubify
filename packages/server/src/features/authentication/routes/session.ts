import { Request, Response } from 'express'

import sessionGetUserData from '../services/session_get_user_data'
import checkSession from '../services/check_session'

/**
 * Route endpoint for the '/session' endpoint in the authentication router.
 */
async function session(_req: Request, _res: Response) {
  const result = await checkSession(_res.locals.cookies?.session)
  const user = await sessionGetUserData(_res.locals.cookies?.session)

  _res.status(200)
  _res.send({ status: result, user: user })
}

export default session
