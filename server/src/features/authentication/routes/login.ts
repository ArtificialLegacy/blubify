import { Request, Response } from 'express'
import { AddressInfo } from 'net'
import { Details } from 'express-useragent'

import {
  usernameGetUser,
  checkPassword,
  cullSessions,
  createSession,
} from 'features/authentication'

import LoginStatus from '../types/login_status'
import validateLoginData from '../validators/validate_login_data'

/**
 * @endpoint '/login' - This is used for recieving user login data
 */
async function login(_req: Request, _res: Response) {
  const validData = await validateLoginData(_req.body)
  if (!validData) return { status: LoginStatus.InvalidRequest }

  const user = await usernameGetUser(_req.body.username)
  if (user === undefined) {
    _res.status(401)
    _res.send({ status: LoginStatus.InvalidUserDetails })
    return
  }

  const passwordCheck = await checkPassword(_req.body.password, user.password)

  if (!passwordCheck) {
    _res.status(401)
    _res.send({ status: LoginStatus.InvalidUserDetails })
    return
  }

  const ip = (_req.socket.address() as AddressInfo)?.address
  const agent = _req.useragent as Details

  const session = await createSession(user.userId, ip, agent)
  cullSessions(user.userId)

  let data = { session: '', status: LoginStatus.Success, user }

  if (session === undefined) {
    _res.status(500)
    _res.send({ status: LoginStatus.Failed })
    return
  }

  data.session = session

  _res.status(200)
  _res.send(data)
}

export default login
