import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * Returns the name of a song from a song entry.
 * @param entryId entry id to get the song name from.
 * @returns The name of the song.
 *
 * @example
 *
 * const name: string = await songGetName(0)
 */
async function songGetName(entryId: number): Promise<string> {
  const name = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select song_name
        from SongEntries
        where entry_id = ?;
      `,
      [entryId]
    )
    .then(db_col<string>('song_name'))

  return name
}

export default songGetName
