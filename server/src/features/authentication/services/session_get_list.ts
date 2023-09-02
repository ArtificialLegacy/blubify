import type { Session } from '../types/session'

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
