import { RowDataPacket } from 'mysql2'
import { Playlist } from 'types'
import { songGetCount } from 'modules/songs'
import { db_first } from 'utility/db_unwrap'

/**
 * Returns a db object for a specific playlist.
 * @param playlistID ID to get playlist with.
 * @returns DB object for the specified playlist.
 *
 * @example
 *
 * const playlist: Selectable<Playlists> = await playlistGet('playlistID')
 */
async function playlistGet(playlistID: string): Promise<Playlist | undefined> {
  const playlist = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select playlist_id as id, displayname as name, created_at as createdAt, ordering
        from Playlists
        where playlist_id = ?;
      `,
      [playlistID]
    )
    .then(db_first<Playlist>)
    .catch(() => undefined)

  if (playlist !== undefined) {
    playlist.songCount = await songGetCount(playlistID)
  }

  return playlist
}

export default playlistGet
