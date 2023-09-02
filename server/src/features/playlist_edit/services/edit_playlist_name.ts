async function editPlaylistName(_playlistId: string, _name: string) {
  globalThis.db
    .updateTable('playlists')
    .set({ displayname: _name })
    .where('playlist_id', '=', _playlistId)
    .execute()
}

export default editPlaylistName
