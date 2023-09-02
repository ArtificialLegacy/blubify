import { Song } from '../types/song'

/**
 * Gets a list of songs that are in a playlist.
 * @param _playlistId PlaylistID to get the songs from.
 * @returns Array of songs
 *
 * @example
 *
 * const songs: Song[] = await songGetList('playlistID')
 */
async function songGetList(_playlistId: string): Promise<Song[]> {
  const songEntries = await globalThis.db
    .selectFrom('songentries')
    .select([
      'song_name',
      'ordering',
      'song_id',
      'entry_id',
      'created_at',
      'share_key',
    ])
    .where('playlist_id', '=', _playlistId)
    .orderBy('ordering')
    .execute()

  const queries = songEntries.map((_index) =>
    globalThis.db
      .selectFrom('songs')
      .select(['filepath', 'ready', 'failed'])
      .where('song_id', '=', _index.song_id)
      .executeTakeFirst()
  )

  const songs = await Promise.all(queries)

  let songList: Song[] = songs.map((_value, _index) => {
    return {
      songName: songEntries[_index].song_name,
      ordering: songEntries[_index].ordering,
      filepath: _value.filepath,
      ready: Boolean(_value.ready.at(0)),
      failed: Boolean(_value.failed.at(0)),
      entryId: songEntries[_index].entry_id,
      createdAt: songEntries[_index].created_at,
      shareKey: songEntries[_index].share_key,
    } as Song
  })

  return songList
}

export default songGetList
