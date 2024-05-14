/**
 * Edits the name of a playlist in the database.
 * @param playlistId - The ID of the playlist to edit.
 * @param name - The new name of the playlist.
 */
async function editPlaylistName(playlistId: string, name: string) {
  await globalThis.db.query(
    /*sql*/ `
    update Playlists
      set displayname = ?
      where playlist_id = ?;
  `,
    [name, playlistId]
  )
}

export default editPlaylistName
