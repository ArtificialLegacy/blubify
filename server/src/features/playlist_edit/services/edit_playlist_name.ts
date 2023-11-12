/**
 * Edits the name of a playlist in the database.
 * @param _playlistId - The ID of the playlist to edit.
 * @param _name - The new name of the playlist.
 */
async function editPlaylistName(_playlistId: string, _name: string) {
  globalThis.db
    .updateTable('playlists')
    .set({ displayname: _name })
    .where('playlist_id', '=', _playlistId)
    .execute()
}

export default editPlaylistName
