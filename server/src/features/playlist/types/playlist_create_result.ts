/**
 * Enum for the return status for the creation of playlists.
 * @index S000-S099 : Playlist was created.
 * @index S100-S199 : Playlist creation failed.
 */
enum PlaylistCreateResult {
  Success = 'S000',
  Failed = 'S100',
  InvalidRequest = 'S101',
}

export default PlaylistCreateResult
