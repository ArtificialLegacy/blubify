import LoginStatus from '../types/login_status'
import type { LoginData } from '../types/login_data'
import type { LoginResult, LoginResultSuccess } from '../types/login_result'
import validateLoginData from '../validators/validate_login_data'
import { checkPassword } from 'features/authentication'

/**
 * Type Guard for typescript so the .user prop can be used properly
 * @param _result LoginResult to verify as LoginResultSuccess
 * @returns true if _result is LoginResultSuccess else false
 *
 * @example
 *
 * if (loginSuccessGuard(LoginResult)) {
 *    // code requiring .user prop here.
 * }
 */
function loginSuccessGuard(
  _result: LoginResult
): _result is LoginResultSuccess {
  return (_result as LoginResultSuccess).user !== undefined
}

/**
 * Processes the user data and validated it against user data in the db
 * @param _data The raw data recieved from the front end
 * @returns Success if the user details was correct, else will return an error code
 *
 * @example
 *
 * processLogin(LoginData)
 */
async function processLogin(_data: LoginData): Promise<LoginResult> {
  const validData = await validateLoginData(_data)
  if (!validData) return { status: LoginStatus.InvalidRequest }

  const getUser = await globalThis.db
    .selectFrom('users')
    .selectAll()
    .where('username', '=', _data.username)
    .executeTakeFirst()
    .catch(() => undefined)

  if (getUser === undefined) return { status: LoginStatus.InvalidUserDetails }

  if (await checkPassword(_data.password, getUser.pass))
    return { status: LoginStatus.Success, user: getUser }
  else return { status: LoginStatus.InvalidUserDetails }
}

export default processLogin
export { loginSuccessGuard }
