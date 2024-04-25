import { RowDataPacket } from 'mysql2'
import { db_col_all } from 'utility/db_unwrap'

/**
 * Gets a list of song entries that use a song with a given filepath.
 * @param filepath - The filepath of the song.
 * @returns - A list of song entries that use the song.
 */
async function songEntryGetFile(filepath: string): Promise<number[]> {
  const songEntry = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select entry_id
        from Songs
        inner join SongEntries
          on Songs.song_id = SongEntries.song_id
        where filepath = ?;
      `,
      [filepath]
    )
    .then(db_col_all<number>('entry_id'))

  return songEntry
}

export default songEntryGetFile
