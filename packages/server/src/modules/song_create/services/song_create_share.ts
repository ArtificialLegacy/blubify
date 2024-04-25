import { RowDataPacket } from 'mysql2'
import type { ShareImportData } from 'types'
import { db_col, db_first } from 'utility/db_unwrap'

type Entry = { songId: string; songName: string }

/**
 * Create a song entry from a share key.
 * @param data - The share key and the playlist id.
 * @returns True if the song entry was created.
 */
async function songCreateShare(data: ShareImportData): Promise<boolean> {
  const songEntry = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select song_id as songId, song_name as songName
        from SongEntries
        where share_key = ?;
      `,
      [data.shareKey]
    )
    .then(db_first<Entry>)
    .catch(() => undefined)

  if (songEntry === undefined) return false

  const count = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select count(song_id) as count
        from SongEntries
        where playlist_id = ?
        group by playlist_id;
      `,
      [data.playlistid]
    )
    .then(db_col<number>('count'))
    .catch(() => 0)

  await globalThis.db.query(
    /*sql*/ `
    insert into SongEntries (song_id, song_name, playlist_id, ordering)
      values (?, ?, ?, ?);
  `,
    [songEntry.songId, songEntry.songName, data.playlistid, count]
  )

  return true
}

export default songCreateShare
