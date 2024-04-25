import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * Returns a user id from a playlist id.
 * @param playlistID ID to get playlist with.
 * @returns lser id
 */
async function playlistGetUser(
  playlistID: string
): Promise<number | undefined> {
  const user = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select user_id
        from Playlists
        where playlist_id = ?;
      `,
      [playlistID]
    )
    .then(db_col<number>('user_id'))
    .catch(() => undefined)

  return user
}

export default playlistGetUser
