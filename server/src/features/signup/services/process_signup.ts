import SignupStatus from '../types/signup_status'
import type { SignupData } from '../types/signup_data'
import type { SignupResult, SignupResultSuccess } from '../types/signup_result'
import { hashPassword } from 'features/authentication'
import validateSignupData from '../validators/validate_signup_data'
import { Users } from 'kysely-codegen'
import { Insertable } from 'kysely'

/**
 * Type Guard for typescript so the .user prop can be used properly
 * @param _result SignupResult to verify as SignupResultSuccess
 * @returns true if _result is SignupResultSuccess else false
 *
 * @example
 *
 * if (signupSuccessGuard(SignupResult)) {
 *    // Code requiring .user prop here.
 * }
 */
function signupSuccessGuard(
  _result: SignupResult
): _result is SignupResultSuccess {
  return (_result as SignupResultSuccess).user !== undefined
}

/**
 * Processes the user data and creates a new user entry in the db
 * @param _data The raw data recieved from the front end
 * @returns Success if the user was stored, else will return an error code
 *
 * @example
 *
 * processSignup(SignupData)
 */
async function processSignup(_data: SignupData): Promise<SignupResult> {
  const validData = await validateSignupData(_data)
  if (!validData) return { status: SignupStatus.InvalidRequest }

  const hashedPassword = await hashPassword(_data.password)
  const userData: Insertable<Users> = {
    username: _data.username,
    pass: hashedPassword,
  }

  const result = await globalThis.db
    .insertInto('users')
    .values(userData)
    .execute()
    .then(() => SignupStatus.Success)
    .catch(() => SignupStatus.FailedDBStore)

  return { status: result }
}

export default processSignup
export { signupSuccessGuard }
