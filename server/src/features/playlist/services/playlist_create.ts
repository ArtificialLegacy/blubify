import PlaylistCreateData from '../types/playlist_create_data'

/**
 * Adds a new playlist to the database
 * @param _data PlaylistCreateData submitted to the api **after validation**.
 * @param _userID The user to link to the created playlist.
 * @returns true if the playlist was created successfully, false if it wasn't.
 *
 * @example
 *
 * const created: boolean = await playlistCreate({name: "playlistName"}, userID)
 */
async function playlistCreate(
  _data: PlaylistCreateData,
  _userID: number
): Promise<boolean> {
  const countR = await globalThis.db
    .selectFrom('playlists')
    .select(({ fn }) => [fn.count<number>('playlist_id').as('count')])
    .groupBy('user_id')
    .where('user_id', '=', _userID)
    .execute()

  const count = countR.length === 0 ? 0 : countR[0].count

  const s = await globalThis.db
    .insertInto('playlists')
    .values({ user_id: _userID, displayname: _data.name, ordering: count })
    .execute()
    .catch(() => null)

  return s != null
}

export default playlistCreate
