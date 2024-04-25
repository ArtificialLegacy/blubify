import { Request, Response } from 'express'
import { AddressInfo } from 'net'

import type { SignupData, SignupStatus, UserData } from 'types'
import { validateSignupData } from 'validators'
import accountCreate from '../services/account_create'
import {
  createSession,
  usernameGetUser,
  hashPassword,
} from 'modules/authentication'

function signup(
  deps = {
    usernameGetUser,
    accountCreate,
    createSession,
    hashPassword,
  }
) {
  return async (_req: Request, _res: Response) => {
    const validData = await validateSignupData(_req.body)
    if (!validData) {
      _res.status(400)
      _res.send({ status: 'invalid_request' } as SignupStatus)
      return
    }

    const checkExists = await deps.usernameGetUser(_req.body.username)
    if (checkExists !== undefined) {
      _res.status(400)
      _res.send({ status: 'username_taken' } as SignupStatus)
      return
    }

    const hashedPassword = await deps.hashPassword(_req.body.password)
    const userData: SignupData = {
      username: _req.body.username,
      password: hashedPassword,
    }

    const status = await deps.accountCreate(userData)
    const data = { session: '', status }

    if (status === 'failed_db_store') {
      _res.status(500)
      _res.send(data)
      return
    }

    const userId = (await deps.usernameGetUser(_req.body.username))
      ?.userId as number
    const ip = (_req.socket.address() as AddressInfo)?.address
    const agent = (_req as any).useragent

    const sessionResult = await deps.createSession(userId, ip, agent)

    if (sessionResult === undefined) data.status = 'success_no_session'
    else data.session = sessionResult

    _res.status(200)
    _res.send(data)
  }
}

export default signup
