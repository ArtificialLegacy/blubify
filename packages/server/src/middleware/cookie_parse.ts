import type { Request, Response, NextFunction } from 'express'

/**
 * Middleware to parse the cookie string of incoming requests and store them in _res.locals.cookies
 * @param _req
 * @param _res
 * @param _next
 *
 * @example
 *
 * app.use(cookieParse)
 */
function cookieParse(_req: Request, _res: Response, _next: NextFunction) {
  const cookies = _req.headers.cookie
  const authorization = _req.headers.authorization

  if (!cookies) {
    _res.locals.cookies = { session: authorization }
    return _next()
  }

  const values = cookies.split(';').reduce((_values, _cookie) => {
    const data = _cookie.trim().split('=')
    return { ..._values, [data[0]]: data[1] }
  }, {})
  _res.locals.cookies = values

  _next()
}

export default cookieParse
