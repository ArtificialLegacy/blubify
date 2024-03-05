import { Request, Response } from 'express'
import { AddressInfo } from 'net'
import { Details } from 'express-useragent'

import {
  usernameGetUser,
  checkPassword,
  cullSessions,
  createSession,
} from 'features/authentication'

import type { LoginStatus } from 'types'
import validateLoginData from '../validators/validate_login_data'

/**
 * @endpoint '/login' - This is used for recieving user login data
 */
async function login(_req: Request, _res: Response) {
  const validData = await validateLoginData(_req.body)
  if (!validData) {
    _res.status(400)
    _res.send({ status: 'invalid_request' } as LoginStatus)
    return
  }

  const user = await usernameGetUser(_req.body.username)
  if (user === undefined) {
    _res.status(401)
    _res.send({ status: 'invalid_user_details' } as LoginStatus)
    return
  }

  const passwordCheck = await checkPassword(_req.body.password, user.password)

  if (!passwordCheck) {
    _res.status(401)
    _res.send({ status: 'invalid_user_details' } as LoginStatus)
    return
  }

  const ip = (_req.socket.address() as AddressInfo)?.address
  const agent = _req.useragent as Details

  const session = await createSession(user.userId, ip, agent)
  cullSessions(user.userId)

  let data: LoginStatus = { session: '', status: 'success', user }

  if (session === undefined) {
    _res.status(500)
    _res.send({ status: 'failed' } as LoginStatus)
    return
  }

  data.session = session

  _res.status(200)
  _res.send(data)
}

export default login
