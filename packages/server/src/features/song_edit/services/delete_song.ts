/**
 * deletes a song entry from the database
 * @param _entryId the id of the entry to delete
 * @returns 1 if the entry was deleted, 0 otherwise
 */
async function deleteSong(_entryId: number): Promise<number> {
  const entry = (await globalThis.db
    .selectFrom('songentries')
    .select('ordering')
    .where('entry_id', '=', _entryId)
    .executeTakeFirst()) as { ordering: number } // Song entry will have been validated by the time this is called

  globalThis.db
    .updateTable('songentries')
    .set(({ ref, bxp }) => ({ ordering: bxp(ref('ordering'), '-', 1) }))
    .where('ordering', '>', entry.ordering)
    .execute()

  const result = await globalThis.db
    .deleteFrom('songentries')
    .where('entry_id', '=', _entryId)
    .executeTakeFirst()

  return Number(result.numDeletedRows)
}

export default deleteSong
