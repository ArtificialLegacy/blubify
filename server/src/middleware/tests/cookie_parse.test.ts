import type { Request, Response } from 'express'

import cookieParse from '../cookie_parse'

describe('cookieParse', () => {
  it('should parse the authorization header of incoming requests and store them in response.locals.cookies', () => {
    const request = {
      headers: {
        authorization: '12345',
      },
    }

    const response = {
      locals: {
        cookies: {},
      },
    }

    cookieParse(request as Request, response as unknown as Response, () => {})

    expect(response.locals.cookies).toHaveProperty('session', '12345')
  })

  it('should parse the cookie string of incoming requests and store them in response.locals.cookies', () => {
    const request = {
      headers: {
        cookie: 'session=12345; other=67890',
      },
    }

    const response = {
      locals: {
        cookies: {},
      },
    }

    cookieParse(request as Request, response as unknown as Response, () => {})

    expect(response.locals.cookies).toHaveProperty('session', '12345')
    expect(response.locals.cookies).toHaveProperty('other', '67890')
  })
})
