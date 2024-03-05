import { Request, Response } from 'express'

import sessionGetList from '../services/session_get_list'
import sessionGetUser from '../services/session_get_user'

async function sessionList(_req: Request, _res: Response) {
  // authUserCheck middleware ensures that this is a valid user.
  const user = (await sessionGetUser(_res.locals.cookies?.session)) as number

  const sessions = await sessionGetList(user)

  _res.status(200)
  _res.send(sessions)
}

export default sessionList
