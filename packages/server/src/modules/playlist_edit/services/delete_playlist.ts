/**
 * Deletes a playlist from the database.
 * @param playlistId - The ID of the playlist to delete.
 */
async function deletePlaylist(playlistId: string) {
  await globalThis.db.query(
    /*sql*/ `
    delete from Playlists
      where playlist_id = ?;
    `,
    [playlistId]
  )
}

export default deletePlaylist
