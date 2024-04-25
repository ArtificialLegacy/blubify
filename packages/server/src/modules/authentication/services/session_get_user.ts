import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * Gets a user ID from a session id string.
 * @param _sessionID Session id to check for a user id.
 * @returns userID or null
 *
 * @example
 *
 * const userID: number = await sessionGetUser('sessionid')
 */
async function sessionGetUser(sessionID: string): Promise<number | null> {
  const user = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select user_id
        from BrowserSessions
        where session_id = ?;
      `,
      [sessionID]
    )
    .then(db_col<number>('user_id'))
    .catch(() => null)

  return user
}

export default sessionGetUser
