import { Request, Response } from 'express'

import sessionGetList from '../services/session_get_list'
import sessionGetUser from '../services/session_get_user'

function sessionList(
  deps = {
    sessionGetUser,
    sessionGetList,
  }
) {
  return async (_req: Request, _res: Response) => {
    // authUserCheck middleware ensures that this is a valid user.
    const user = (await deps.sessionGetUser(
      _res.locals.cookies?.session
    )) as number

    const sessions = await deps.sessionGetList(user)

    _res.status(200)
    _res.send(sessions)
  }
}

export default sessionList
