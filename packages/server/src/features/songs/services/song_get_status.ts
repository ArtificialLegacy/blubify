/**
 * Gets the import status of a song.
 * @param _filepath The filepath to search for a song with.
 * @returns True if the song has been imported, False if it hasn't.
 *
 * @example
 *
 * const ready: boolean = await songGetStatus('filepath')
 */
async function songGetStatus(_filepath: string): Promise<boolean> {
  const song = await globalThis.db
    .selectFrom('songs')
    .select('ready')
    .where('filepath', '=', _filepath)
    .executeTakeFirst()

  return Boolean(song?.ready?.at(0))
}

export default songGetStatus
