import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * Get the user id of the user who created the song entry from the database.
 * @param entryId - The id of the song entry.
 * @returns The user id of the user who created the song entry.
 */
async function songEntryGetUser(entryId: number): Promise<number | undefined> {
  const user = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select user_id
        from SongEntries
        inner join Playlists
          on SongEntries.playlist_id = Playlists.playlist_id
        where entry_id = ?;
      `,
      [entryId]
    )
    .then(db_col<number>('user_id'))

  return user
}

export default songEntryGetUser
