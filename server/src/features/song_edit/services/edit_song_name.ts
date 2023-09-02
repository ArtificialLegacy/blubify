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
