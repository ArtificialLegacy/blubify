import bcrypt from 'bcrypt'

/**
 * Uses bcrypt to compare an unhashed password to a hashed one.
 * @param _password - The unhashed password.
 * @param _hash - Hashed password to compare against.
 * @returns - true if passwords match, else false.
 *
 * @example
 *
 * const same: Boolean = await checkPassword('password', 'hashedPasswordHere')
 *
 * checkPassword('password', 'hashedPasswordHere').then(same: Boolean => {})
 */
async function checkPassword(
  _password: string,
  _hash: string
): Promise<boolean> {
  return await bcrypt.compare(_password, _hash).then((_hash: string) => _hash)
}

export default checkPassword
