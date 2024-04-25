import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * function to get a count of song entries in a playlist
 * @param playlistId the id of the playlist
 * @returns the count of song entries in the playlist
 */
async function songGetCount(playlistId: string): Promise<number> {
  const count = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select count(entry_id) as count
        from SongEntries
        where playlist_id = ?
        group by playlist_id;
      `,
      [playlistId]
    )
    .then(db_col<number>('count'))
    .catch(() => 0)

  return count
}

export default songGetCount
