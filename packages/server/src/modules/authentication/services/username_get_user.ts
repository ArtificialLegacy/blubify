import { RowDataPacket } from 'mysql2'
import type { UserAuthData } from 'types'
import { db_first } from 'utility/db_unwrap'

async function usernameGetUser(
  username: string
): Promise<UserAuthData | undefined> {
  const user = globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
    select username, pass as password, user_id as userId
      from Users
      where username = ?;
    `,
      [username]
    )
    .then(db_first<UserAuthData>)
    .catch(() => undefined)

  return user
}

export default usernameGetUser
