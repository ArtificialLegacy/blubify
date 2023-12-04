import { Request, Response } from 'express'

import { sessionGetUser } from 'features/authentication'
import GenericResult from 'types/generic_result'
import updateUserSettings from '../services/update_user_settings'

/**
 * Route endpoint for the '/edit' endpoint in the account settings router.
 */
async function editRoute(_req: Request, _res: Response) {
  // authUserCheck middleware ensures that this is a valid user.
  const user = (await sessionGetUser(_res.locals.cookies?.session)) as number

  if (_req.body.theme < 0 && _req.body.theme > 2) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  const success = await updateUserSettings(user, _req.body.theme)

  if (!success) {
    _res.status(500)
    _res.send({ status: GenericResult.Failed })
  }

  _res.status(200)
  _res.send({ status: GenericResult.Success })
}

export default editRoute
