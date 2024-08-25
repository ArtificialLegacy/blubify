import { playlistGet } from 'modules/playlist'

/**
 * Updates the ordering of a playlist in the database.
 * Will reorganize the ordering of all playlists own by the user based on the new position of the playlist.
 * @param userId
 * @param playlistId
 * @param newOrder
 */
async function editPlaylistOrder(
  userId: number,
  playlistId: string,
  newOrder: number
) {
  const playlist = await playlistGet(playlistId)

  if (playlist === undefined) return
  if (playlist.ordering === newOrder) return

  const lo = Math.min(playlist.ordering, newOrder)
  const hi = Math.max(playlist.ordering, newOrder)

  console.log(newOrder, playlist.ordering)

  if (newOrder < playlist.ordering) {
    await globalThis.db.query(
      /*sql*/ `
      update Playlists
        set ordering = ordering + 1
        where user_id = ?
          and ordering >= ?
          and ordering <= ?;
      `,
      [userId, lo, hi]
    )
  } else {
    await globalThis.db.query(
      /*sql*/ `
      update Playlists
        set ordering = ordering - 1
        where user_id = ?
          and ordering >= ?
          and ordering <= ?;
      `,
      [userId, lo, hi]
    )
  }

  await globalThis.db.query(
    /*sql*/ `
    update Playlists
      set ordering = ?
      where playlist_id = ?;
    `,
    [newOrder, playlistId]
  )
}

export default editPlaylistOrder
