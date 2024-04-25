import { RowDataPacket } from 'mysql2'
import type { PlaylistCreateData } from 'types'
import { db_col } from 'utility/db_unwrap'

/**
 * Adds a new playlist to the database
 * @param data PlaylistCreateData submitted to the api **after validation**.
 * @param userID The user to link to the created playlist.
 * @returns true if the playlist was created successfully, false if it wasn't.
 *
 * @example
 *
 * const created: boolean = await playlistCreate({name: "playlistName"}, userID)
 */
async function playlistCreate(
  data: PlaylistCreateData,
  userID: number
): Promise<boolean> {
  const count = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select count(playlist_id) as count
        from Playlists
        where user_id = ?
        group by user_id;
      `,
      [userID]
    )
    .then(db_col<number>('count'))
    .catch(() => 0)

  const s = await globalThis.db
    .query(
      /*sql*/ `
      insert into Playlists (user_id, displayname, ordering)
        values (?, ?, ?);
    `,
      [userID, data.name, count]
    )
    .then(() => true)
    .catch(() => false)

  return s
}

export default playlistCreate
