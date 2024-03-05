import type { SongEntry } from 'types'

/**
 * Gets a song entry by its ID
 * @param entryId - The ID of the song entry
 * @returns The song entry, or undefined if it does not exist
 */
async function songEntryGet(entryId: number): Promise<SongEntry | undefined> {
  return await globalThis.db
    .selectFrom('songentries')
    .selectAll()
    .where('entry_id', '=', entryId)
    .executeTakeFirst()
}

export default songEntryGet
