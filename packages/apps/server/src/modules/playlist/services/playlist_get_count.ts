import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * Get the number of playlists associated with a user from the database.
 * @param userId - The user ID to get the number of playlists for.
 * @returns The number of playlists associated with the user.
 */
async function playlistGetCount(userId: number): Promise<number> {
  const count = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select count(playlist_id) as count
        from Playlists
        where user_id = ?
        group by user_id;
      `,
      [userId]
    )
    .then(db_col<number>('count'))
    .catch(() => 0)

  return count
}

export default playlistGetCount
