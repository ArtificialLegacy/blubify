import type { Playlist } from 'types'
import { songGetCount } from 'modules/songs'
import { RowDataPacket } from 'mysql2'
import { db_unwrap } from 'utility/db_unwrap'

/**
 * Gets an array of all playlists associated with an user.
 * @param userID UserID to check for playlists.
 * @returns Array of playlists.
 *
 * @example
 *
 * const playlists: Playlist[] = await playlistGetList(userID)
 */
async function playlistGetList(
  userID: number
): Promise<Omit<{ songCount: number }[], keyof Playlist[]> & Playlist[]> {
  const playlists = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select playlist_id as id, displayname as name, created_at as createdAt, ordering
        from Playlists
        where user_id = ?
        order by ordering;
      `,
      [userID]
    )
    .then(db_unwrap<Playlist>)
    .catch(() => [] as Playlist[])

  for (let i = 0; i < playlists.length; i++) {
    playlists[i].songCount = await songGetCount(playlists[i].id)
  }

  return playlists
}

export default playlistGetList
