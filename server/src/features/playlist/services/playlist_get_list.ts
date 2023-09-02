import type { Playlist } from '../types/playlist'
import { songGetCount } from 'features/songs'

/**
 * Gets an array of all playlists associated with an user.
 * @param _userID UserID to check for playlists.
 * @returns Array of playlists.
 *
 * @example
 *
 * const playlists: Playlist[] = await playlistGetList(userID)
 */
async function playlistGetList(
  _userID: number
): Promise<Omit<{ songCount: number }[], keyof Playlist[]> & Playlist[]> {
  const playlists = await globalThis.db
    .selectFrom('playlists')
    .select((_eb) => [
      'playlist_id as id',
      'displayname as name',
      'created_at as createdAt',
      'ordering',
    ])
    .where('user_id', '=', _userID)
    .orderBy('ordering')
    .execute()

  const playlistsUpdated: any[] = [...playlists]

  for (let i = 0; i < playlists.length; i++) {
    playlistsUpdated[i].songCount = await songGetCount(playlists[i].id)
  }

  return playlistsUpdated
}

export default playlistGetList
