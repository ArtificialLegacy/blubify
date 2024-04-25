import { RowDataPacket } from 'mysql2'
import type { SongEntry } from 'types'
import { db_first } from 'utility/db_unwrap'

/**
 * Gets a song entry by its ID
 * @param entryId - The ID of the song entry
 * @returns The song entry, or undefined if it does not exist
 */
async function songEntryGet(entryId: number): Promise<SongEntry | undefined> {
  return await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select entry_id as entryId, playlist_id as playlistId, song_id as songId, ordering, song_name as name, created_at as createdAt, share_key as share_key
        from SongEntries
        where entry_id = ?;
      `,
      [entryId]
    )
    .then(db_first<SongEntry>)
    .catch(() => undefined)
}

export default songEntryGet
