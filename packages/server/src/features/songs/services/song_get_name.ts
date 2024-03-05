/**
 * Returns the name of a song from a song entry.
 * @param _entryId entry id to get the song name from.
 * @returns The name of the song.
 *
 * @example
 *
 * const name: string = await songGetName(0)
 */
async function songGetName(_entryId: number): Promise<string> {
  const { songName } = (await globalThis.db
    .selectFrom('songentries')
    .select('song_name as songName')
    .where('entry_id', '=', _entryId)
    .executeTakeFirst()
    .catch(() => {
      return {
        song_name: '',
      }
    })) as { songName: string }

  return songName
}

export default songGetName
