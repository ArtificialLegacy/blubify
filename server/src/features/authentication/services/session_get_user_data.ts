import type UserData from '../types/user_data'
import sessionGetUser from './session_get_user'

/**
 * Gets user data from a session ID.
 * @param _sessionID - The session ID to get user data for.
 * @returns The user data.
 */
async function sessionGetUserData(_sessionID: string): Promise<UserData> {
  const user = await sessionGetUser(_sessionID)

  const userData = await globalThis.db
    .selectFrom('users')
    .select(['username', 'created_at as createdAt', 'theme'])
    .where('user_id', '=', user)
    .executeTakeFirst()

  return userData
}

export default sessionGetUserData
