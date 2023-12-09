import validateLoginData from '../validate_login_data'

import type { LoginData } from '../../types/login_data'

describe('validateLoginData', () => {
  it('should return true if valid', async () => {
    const valid = await validateLoginData({
      username: 'username',
      password: 'password',
    })
    expect(valid).toBe(true)
  })

  it('should return false if invalid', async () => {
    const valid = await validateLoginData({} as unknown as LoginData)
    expect(valid).toBe(false)
  })
})
