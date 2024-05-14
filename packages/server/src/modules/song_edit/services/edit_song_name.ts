/**
 * Edits the name of a song entry in the database.
 * @param entryId - The id of the song entry to edit.
 * @param name - The new name of the song entry.
 * @returns If the song entry was edited successfully.
 */
async function editSongName(entryId: number, name: string): Promise<boolean> {
  const success = await globalThis.db
    .query(
      /*sql*/ `
      update SongEntries
        set song_name = ?
        where entry_id = ?;
      `,
      [name, entryId]
    )
    .then(() => true)
    .catch(() => false)

  return success
}

export default editSongName
