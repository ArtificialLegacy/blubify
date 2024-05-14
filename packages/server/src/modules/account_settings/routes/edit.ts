import { Request, Response } from 'express'

import { sessionGetUser } from 'modules/authentication'
import type { APIStatus } from 'types'
import updateUserSettings from '../services/update_user_settings'

/**
 * Route endpoint for the '/edit' endpoint in the account settings router.
 */
function editRoute(
  deps = {
    sessionGetUser,
    updateUserSettings,
  }
) {
  return async (req: Request, res: Response) => {
    // authUserCheck middleware ensures that this is a valid user.
    const user = (await deps.sessionGetUser(
      res.locals.cookies?.session
    )) as number

    if (req.body.theme < 0 && req.body.theme > 2) {
      res.status(400)
      res.send({ status: 'invalid_request' } as APIStatus)
      return
    }

    const success = await deps.updateUserSettings(user, req.body.theme)

    if (!success) {
      res.status(500)
      res.send({ status: 'failed' } as APIStatus)
      return
    }

    res.status(200)
    res.send({ status: 'success' } as APIStatus)
  }
}

export default editRoute
