async function songEntryGetUser(_entryId: number): Promise<number> {
  const user = await globalThis.db
    .selectFrom('songentries')
    .where('entry_id', '=', _entryId)
    .innerJoin('playlists', 'songentries.playlist_id', 'playlists.playlist_id')
    .select('user_id')
    .executeTakeFirst()

  return user.user_id
}

export default songEntryGetUser
