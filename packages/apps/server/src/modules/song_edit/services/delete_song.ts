import { RowDataPacket } from 'mysql2'

/**
 * deletes a song entry from the database
 * @param entryId the id of the entry to delete
 * @returns 1 if the entry was deleted, 0 otherwise
 */
async function deleteSong(entryId: number): Promise<number> {
  const order = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
    select ordering
      from SongEntries
      where entry_id = ?;
    `,
      [entryId]
    )
    .then((result) => {
      return result[0][0]['ordering']
    })

  globalThis.db.query(
    /*sql*/ `
    update SongEntries
      set ordering = ordering - 1
      where ordering > ?;
    `,
    [order]
  )

  const result = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      delete from SongEntries
        where entry_id = ?;
      `,
      [entryId]
    )
    .then(() => 1)
    .catch(() => 0)

  return result
}

export default deleteSong
