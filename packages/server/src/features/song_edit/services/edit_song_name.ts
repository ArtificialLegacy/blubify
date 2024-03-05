/**
 * Edits the name of a song entry in the database.
 * @param _entryId - The id of the song entry to edit.
 * @param _name - The new name of the song entry.
 * @returns If the song entry was edited successfully.
 */
async function editSongName(_entryId: number, _name: string): Promise<boolean> {
  const success = await globalThis.db
    .updateTable('songentries')
    .set({
      song_name: _name,
    })
    .where('entry_id', '=', _entryId)
    .execute()
    .then(() => true)
    .catch(() => false)

  return success
}

export default editSongName
