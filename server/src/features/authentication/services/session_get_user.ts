/**
 * Gets a user ID from a session id string.
 * @param _sessionID Session id to check for a user id.
 * @returns userID or null
 *
 * @example
 *
 * const userID: number = await sessionGetUser('sessionid')
 */
async function sessionGetUser(_sessionID: string): Promise<number> {
  const user = await globalThis.db
    .selectFrom('browsersessions')
    .select('user_id')
    .where('session_id', '=', _sessionID)
    .executeTakeFirst()
    .catch(() => null)

  return user == null ? null : user.user_id
}

export default sessionGetUser
