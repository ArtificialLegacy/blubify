import { RowDataPacket } from 'mysql2'
import type { Song } from 'types'
import { db_first, db_unwrap } from 'utility/db_unwrap'

type Entry = {
  name: string
  ordering: number
  songId: number
  entryId: number
  createdAt: string
  shareKey: string
}

type SongQuery = { filepath: string; ready: Buffer; failed: Buffer }

/**
 * Gets a list of songs that are in a playlist.
 * @param playlistId PlaylistID to get the songs from.
 * @returns Array of songs
 */
async function songGetList(playlistId: string): Promise<Song[]> {
  const entries = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select song_name as name, ordering, song_id as songId, entry_id as entryId, created_at as createdAt, share_key as shareKey
        from SongEntries
        where playlist_id = ?
        order by ordering;
    `,
      [playlistId]
    )
    .then(db_unwrap<Entry>)

  const queries = entries.map((entry) =>
    globalThis.db.query<RowDataPacket[]>(
      /*sql*/ `
      select filepath, ready, failed
        from Songs
        where song_id = ?;
      `,
      [entry.songId]
    )
  )

  const songs = await Promise.all(queries).then((result) => {
    return result.map(db_first<SongQuery>)
  })

  let songList: Song[] = songs.map((song, i) => {
    return {
      songName: entries[i].name,
      ordering: entries[i].ordering,
      filepath: song.filepath,
      ready: Boolean(song.ready.at(0)),
      failed: Boolean(song.failed.at(0)),
      entryId: entries[i].entryId,
      createdAt: entries[i].createdAt.toString(),
      shareKey: entries[i].shareKey,
    } as Song
  })

  return songList
}

export default songGetList
