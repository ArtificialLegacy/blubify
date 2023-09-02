import { Router } from 'express'
import { AddressInfo } from 'net'

import processLogin, { loginSuccessGuard } from './services/process_login'
import LoginStatus from './types/login_status'

import createSession from 'features/authentication/services/create_session'
import cullSessions from 'features/authentication/services/cull_sessions'

/**
 * @endpoint '/login' - This is used for recieving user login data
 *
 * @packageDocumentation
 */
const router = Router()

router.post('/login', async (_req, _res) => {
  processLogin(_req.body).then(async (_result) => {
    const data = { session: '', status: _result.status }

    if (loginSuccessGuard(_result)) {
      const session = await createSession(
        _result.user.user_id,
        (_req.socket.address() as AddressInfo)?.address,
        (_req as any).useragent
      )
      cullSessions(_result.user.user_id)

      if (session == null || session === undefined)
        data.status = LoginStatus.Failed
      else data.session = session
    }

    _res.send(data)
  })
})

export default router
