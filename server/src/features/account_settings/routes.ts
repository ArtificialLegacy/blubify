import { Router } from 'express'

import { sessionGetUser, authUserCheck } from 'features/authentication'
import GenericResult from 'types/generic_result'
import updateUserSettings from './services/update_user_settings'

/**
 * @middleware authUserCheck
 *
 * @endpoint '/edit' - Endpoint used for updating user settings.
 *
 * @packageDocumentation
 */
const router = Router()

router.use(authUserCheck)

router.put('/edit', async (_req, _res) => {
  const user = await sessionGetUser(_res.locals.cookies?.session)
  if (user === undefined || user === null) {
    _res.status(403)
    _res.send({ status: GenericResult.Failed })
    return
  }

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
})

export default router
