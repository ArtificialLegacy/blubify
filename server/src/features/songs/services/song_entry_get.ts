import type { SongEntry } from '../types/song_entry'

async function songEntryGet(entryId: number): Promise<SongEntry | undefined> {
  return await globalThis.db
    .selectFrom('songentries')
    .selectAll()
    .where('entry_id', '=', entryId)
    .executeTakeFirst()
}

export default songEntryGet
