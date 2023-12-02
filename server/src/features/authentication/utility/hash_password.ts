import bcrypt from 'bcrypt'

const SALT_ROUNDS = 15

/**
 * Uses bcrypt to hash a plain text password.
 * @param _password Plain text password to hash.
 * @returns Hashed password
 *
 * @example
 *
 * const password: String = await hashPassword('password')
 *
 * hashPassword('password').then(password: String => {})
 */
async function hashPassword(_password: string): Promise<string> {
  return await bcrypt
    .hash(_password, SALT_ROUNDS)
    .then((_hash: string) => _hash)
}

export default hashPassword
