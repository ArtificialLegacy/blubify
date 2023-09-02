async function playlistGetCount(_userId: number): Promise<number> {
  const count = await globalThis.db
    .selectFrom('playlists')
    .where('user_id', '=', _userId)
    .select(({ fn }) => [fn.count<number>('playlist_id').as('count')])
    .groupBy('user_id')
    .execute()

  return count[0].count
}

export default playlistGetCount
