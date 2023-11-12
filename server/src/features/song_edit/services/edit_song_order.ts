/**
 * Edit the order of a song in a playlist, and shift the other songs accordingly.
 * @param _entryId - The id of the song entry to edit.
 * @param _newOrder - The new order of the song entry.
 */
async function editSongOrder(_entryId: number, _newOrder: number) {
  const entry = await globalThis.db
    .selectFrom('songentries')
    .select('playlist_id')
    .select('ordering')
    .where('entry_id', '=', _entryId)
    .executeTakeFirst()

  if (entry.ordering === _newOrder) return

  const lo = Math.min(entry.ordering, _newOrder)
  const hi = Math.max(entry.ordering, _newOrder)

  await globalThis.db
    .updateTable('songentries')
    .set(({ ref, bxp }) => ({
      ordering: bxp(ref('ordering'), _newOrder > entry.ordering ? '-' : '+', 1),
    }))
    .where(({ and, cmpr }) =>
      and([
        cmpr('playlist_id', '=', entry.playlist_id),
        cmpr('ordering', '>=', lo),
        cmpr('ordering', '<=', hi),
      ])
    )
    .execute()

  await globalThis.db
    .updateTable('songentries')
    .set({ ordering: _newOrder })
    .where('entry_id', '=', _entryId)
    .execute()
}

export default editSongOrder
