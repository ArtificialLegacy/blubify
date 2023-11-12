/**
 * Deletes a playlist from the database.
 * @param _playlistId - The ID of the playlist to delete.
 */
async function deletePlaylist(_playlistId: string) {
  globalThis.db
    .deleteFrom('playlists')
    .where('playlist_id', '=', _playlistId)
    .execute()
}

export default deletePlaylist
