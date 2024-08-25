import { RowDataPacket } from 'mysql2'
import { db_first } from 'utility/db_unwrap'

type Entry = { id: string; ordering: number }

/**
 * Edit the order of a song in a playlist, and shift the other songs accordingly.
 * @param entryId - The id of the song entry to edit.
 * @param newOrder - The new order of the song entry.
 */
async function editSongOrder(entryId: number, newOrder: number) {
  const entry = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select playlist_id as id, ordering
        from SongEntries
        where entry_id = ?;
      `,
      [entryId]
    )
    .then(db_first<Entry>)

  if (entry.ordering === newOrder) return

  const lo = Math.min(entry.ordering, newOrder)
  const hi = Math.max(entry.ordering, newOrder)

  if (newOrder < entry.ordering) {
    await globalThis.db.query(
      /*sql*/ `
      update SongEntries
        set ordering = ordering + 1
        where playlist_id = ?
          and ordering >= ?
          and ordering <= ?; 
      `,
      [entry.id, lo, hi]
    )
  } else {
    await globalThis.db.query(
      /*sql*/ `
      update SongEntries
        set ordering = ordering - 1
        where playlist_id = ?
          and ordering >= ?
          and ordering <= ?; 
      `,
      [entry.id, lo, hi]
    )
  }

  await globalThis.db.query(
    /*sql*/ `
    update SongEntries
      set ordering = ?
      where entry_id = ?;
    `,
    [newOrder, entryId]
  )
}

export default editSongOrder
