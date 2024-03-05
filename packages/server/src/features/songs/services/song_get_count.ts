/**
 * function to get a count of song entries in a playlist
 * @param _playlistId the id of the playlist
 * @returns the count of song entries in the playlist
 */
async function songGetCount(_playlistId: string): Promise<number> {
  const count = await globalThis.db
    .selectFrom('songentries')
    .where('playlist_id', '=', _playlistId)
    .select(({ fn }) => [fn.count<number>('entry_id').as('count')])
    .groupBy('playlist_id')
    .execute()

  return count[0]?.count ?? 0
}

export default songGetCount
