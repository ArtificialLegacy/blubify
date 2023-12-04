import type { UserAuthData } from '../types/user_auth_data'

async function usernameGetUser(
  _username: string
): Promise<UserAuthData | undefined> {
  const user = await globalThis.db
    .selectFrom('users')
    .select(['username', 'pass as password', 'user_id as userId'])
    .where('username', '=', _username)
    .executeTakeFirst()
    .catch(() => undefined)

  return user
}

export default usernameGetUser
