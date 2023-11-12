/**
 * Get the number of playlists associated with a user from the database.
 * @param _userId - The user ID to get the number of playlists for.
 * @returns The number of playlists associated with the user.
 */
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
