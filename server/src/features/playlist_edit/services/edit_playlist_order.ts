import { playlistGet } from 'features/playlist'

/**
 * Updates the ordering of a playlist in the database.
 * Will reorganize the ordering of all playlists own by the user based on the new position of the playlist.
 * @param _playlistId
 * @param _newOrder
 * @returns
 */
async function editPlaylistOrder(_playlistId: string, _newOrder: number) {
  const playlist = await playlistGet(_playlistId)

  if (playlist.ordering === _newOrder) return

  const lo = Math.min(playlist.ordering, _newOrder)
  const hi = Math.max(playlist.ordering, _newOrder)

  await globalThis.db
    .updateTable('playlists')
    .set(({ ref, bxp }) => ({
      ordering: bxp(
        ref('ordering'),
        _newOrder > playlist.ordering ? '-' : '+',
        1
      ),
    }))
    .where(({ and, cmpr }) =>
      and([
        cmpr('user_id', '=', playlist.user_id),
        cmpr('ordering', '>=', lo),
        cmpr('ordering', '<=', hi),
      ])
    )
    .execute()

  await globalThis.db
    .updateTable('playlists')
    .set({ ordering: _newOrder })
    .where('playlist_id', '=', _playlistId)
    .execute()
}

export default editPlaylistOrder
