import type { Session } from '../types/session'

/**
 * Gets a list of sessions for a user.
 * @param _user - The user to get sessions for.
 * @returns A list of sessions.
 */
async function sessionGetList(_user: number): Promise<Session[]> {
  const sessions = await globalThis.db
    .selectFrom('browsersessions')
    .select([
      'session_id as sessionId',
      'created_at as createdAt',
      'ip',
      'device_string as deviceString',
    ])
    .execute()

  return sessions
}

export default sessionGetList
