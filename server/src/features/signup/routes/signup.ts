import { Request, Response } from 'express'
import { Insertable } from 'kysely'
import { Users } from 'kysely-codegen'
import { AddressInfo } from 'net'

import SignupStatus from '../types/signup_status'
import validateSignupData from '../validators/validate_signup_data'
import { hashPassword } from 'features/authentication'
import accountCreate from '../services/account_create'
import { createSession, usernameGetUser } from 'features/authentication'

async function signup(_req: Request, _res: Response) {
  const validData = await validateSignupData(_req.body)
  if (!validData) {
    _res.status(400)
    _res.send({ status: SignupStatus.InvalidRequest })
    return
  }

  const checkExists = await usernameGetUser(_req.body.username)
  if (checkExists !== undefined) {
    _res.status(400)
    _res.send({ status: SignupStatus.UsernameTaken })
    return
  }

  const hashedPassword = await hashPassword(_req.body.password)
  const userData: Insertable<Users> = {
    username: _req.body.username,
    pass: hashedPassword,
  }

  const status = await accountCreate(userData)
  const data = { session: '', status }

  if (status === SignupStatus.FailedDBStore) {
    _res.status(500)
    _res.send(data)
    return
  }

  const userId = (await usernameGetUser(_req.body.username))?.userId as number
  const ip = (_req.socket.address() as AddressInfo)?.address
  const agent = (_req as any).useragent

  const sessionResult = await createSession(userId, ip, agent)

  if (sessionResult === undefined) data.status = SignupStatus.SuccessNoSession
  else data.session = sessionResult

  _res.status(200)
  _res.send(data)
}

export default signup
