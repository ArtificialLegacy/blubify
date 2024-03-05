import { Playlists } from 'kysely-codegen'
import { Selectable } from 'kysely'

/**
 * Returns a db object for a specific playlist.
 * @param _playlistID ID to get playlist with.
 * @returns DB object for the specified playlist.
 *
 * ! refactor return type
 *
 * @example
 *
 * const playlist: Selectable<Playlists> = await playlistGet('playlistID')
 */
async function playlistGet(
  _playlistID: string
): Promise<Selectable<Playlists> | undefined> {
  return await globalThis.db
    .selectFrom('playlists')
    .selectAll()
    .where('playlist_id', '=', _playlistID)
    .executeTakeFirst()
}

export default playlistGet
