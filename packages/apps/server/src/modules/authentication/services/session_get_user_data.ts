import type { UserData } from 'types'
import sessionGetUser from './session_get_user'
import { RowDataPacket } from 'mysql2'
import { db_first } from 'utility/db_unwrap'

/**
 * Gets user data from a session ID.
 * @param sessionID - The session ID to get user data for.
 * @returns The user data.
 */
async function sessionGetUserData(sessionID: string): Promise<UserData> {
  const user = await sessionGetUser(sessionID)

  const userData = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select username, created_at as createdAt, theme
        from Users
        where user_id = ?;
      `,
      [user]
    )
    .then(db_first<UserData>)

  return userData
}

export default sessionGetUserData
