import { Router } from 'express'
import { AddressInfo } from 'net'

import processSignup, { signupSuccessGuard } from './services/process_signup'
import SignupStatus from './types/signup_status'

import createSession from 'features/authentication/services/create_session'

/**
 * @endpoint '/signup' - This is used for recieving user creation data
 *
 * @packageDocumentation
 */
const router = Router()

router.post('/signup', async (_req, _res) => {
  processSignup(_req.body).then(async (_result) => {
    const data = { session: '', status: _result.status }

    if (signupSuccessGuard(_result)) {
      const sessionResult = await createSession(
        _result.user.user_id,
        (_req.socket.address() as AddressInfo)?.address,
        (_req as any).useragent
      )

      if (sessionResult !== undefined)
        data.status = SignupStatus.SuccessNoSession
      else data.session = sessionResult[0]
    }

    _res.send(data)
  })
})

export default router
