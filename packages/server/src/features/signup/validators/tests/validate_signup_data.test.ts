import validateSignupData from '../validate_signup_data'
import type { SignupData } from '../../types/signup_data'

describe('validateSignupData', () => {
  it('should return true if valid', async () => {
    const valid = await validateSignupData({
      username: 'username',
      password: 'Password1!',
    })
    expect(valid).toBe(true)
  })

  it('should return false if invalid', async () => {
    const valid = await validateSignupData({} as SignupData)
    expect(valid).toBe(false)
  })
})
