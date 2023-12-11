/**
 * Gets a list of song entries that use a song with a given filepath.
 * @param _filepath - The filepath of the song.
 * @returns - A list of song entries that use the song.
 */
async function songEntryGetFile(
  _filepath: string
): Promise<{ entryId: number }[] | undefined> {
  const songEntry = await globalThis.db
    .selectFrom('songs')
    .where('filepath', '=', _filepath)
    .innerJoin('songentries', 'songs.song_id', 'songentries.song_id')
    .select('entry_id as entryId')
    .execute()

  return songEntry
}

export default songEntryGetFile
