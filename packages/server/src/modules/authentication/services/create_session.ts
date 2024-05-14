import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * Creates a new session and connects it to a user
 * @param req The express request to get the
 * @param userId user id from the user model to connect the session to
 * @returns sessionID
 */
async function createSession(
  userId: number,
  ip: string,
  agent: { platform: string; browser: string }
): Promise<string | undefined> {
  const deviceString = `${agent.platform} [${agent.browser}]`

  await globalThis.db.query(
    /*sql*/ `
    insert into BrowserSessions (user_id, ip, device_string)
      values (?, ?, ?);
    `,
    [userId, ip, deviceString]
  )

  const sessionID: string | undefined = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select session_id
        from BrowserSessions
        where user_id = ?
        order by created_at desc;
      `,
      [userId]
    )
    .then(db_col('session_id'))
    .catch(() => undefined)

  return sessionID
}

export default createSession
