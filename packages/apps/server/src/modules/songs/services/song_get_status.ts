import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * Gets the import status of a song.
 * @param filepath The filepath to search for a song with.
 * @returns True if the song has been imported, False if it hasn't.
 *
 * @example
 *
 * const ready: boolean = await songGetStatus('filepath')
 */
async function songGetStatus(filepath: string): Promise<boolean> {
  const ready = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select ready
        from Songs
        where filepath = ?;
      `,
      [filepath]
    )
    .then(db_col<Buffer>('ready'))

  return Boolean(ready.at(0))
}

export default songGetStatus
