async function deletePlaylist(_playlistId: string) {
  globalThis.db
    .deleteFrom('playlists')
    .where('playlist_id', '=', _playlistId)
    .execute()
}

export default deletePlaylist
