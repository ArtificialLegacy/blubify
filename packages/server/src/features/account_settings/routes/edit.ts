import { Request, Response } from 'express'

import { sessionGetUser } from 'features/authentication'
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
  return async (_req: Request, _res: Response) => {
    // authUserCheck middleware ensures that this is a valid user.
    const user = (await deps.sessionGetUser(
      _res.locals.cookies?.session
    )) as number

    if (_req.body.theme < 0 && _req.body.theme > 2) {
      _res.status(400)
      _res.send({ status: 'invalid_request' } as APIStatus)
      return
    }

    const success = await deps.updateUserSettings(user, _req.body.theme)

    if (!success) {
      _res.status(500)
      _res.send({ status: 'failed' } as APIStatus)
    }

    _res.status(200)
    _res.send({ status: 'success' } as APIStatus)
  }
}

export default editRoute
