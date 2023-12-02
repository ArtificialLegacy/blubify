import checkPassword from '../check_password'
import hashPassword from '../hash_password'

describe('passwords', () => {
  it('should hash and check passwords', async () => {
    const password = 'password'
    const hashedPassword = await hashPassword(password)
    const same = await checkPassword(password, hashedPassword)
    expect(same).toBe(true)
  })
})
