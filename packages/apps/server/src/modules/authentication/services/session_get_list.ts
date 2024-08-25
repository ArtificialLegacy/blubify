import { RowDataPacket } from 'mysql2'
import type { Session } from 'types'
import { db_unwrap } from 'utility/db_unwrap'

/**
 * Gets a list of sessions for a user.
 * @param _user - The user to get sessions for.
 * @returns A list of sessions.
 */
async function sessionGetList(_user: number): Promise<Session[]> {
  const sessions = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select session_id as sessionId, created_at as createdAt, ip, device_string as deviceString
        from BrowserSessions;
      `
    )
    .then(db_unwrap)

  sessions.forEach((session) => {
    if (session.ip === null) {
      session.ip = ''
    }
  })

  return sessions as Session[]
}

export default sessionGetList
