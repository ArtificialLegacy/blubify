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

  sessions.forEach((session) => {
    if (session.ip === null) {
      session.ip = ''
    }
  })

  return sessions as Session[]
}

export default sessionGetList
