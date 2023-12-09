/**
 * Get the user id of the user who created the song entry from the database.
 * @param _entryId - The id of the song entry.
 * @returns The user id of the user who created the song entry.
 */
async function songEntryGetUser(_entryId: number): Promise<number | undefined> {
  const user = await globalThis.db
    .selectFrom('songentries')
    .where('entry_id', '=', _entryId)
    .innerJoin('playlists', 'songentries.playlist_id', 'playlists.playlist_id')
    .select('user_id')
    .executeTakeFirst()

  return user?.user_id
}

export default songEntryGetUser
