import { v4 as uuidv4 } from 'uuid'
import { promises as fs } from 'fs'

import type { YoutubeImportData } from 'types'
import songDownloadYoutube from './song_download_youtube'
import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * Creates a new song entry, and if needed, creates a new song and downloads it from youtube.
 * @param data The youtube import data submitted by the user **after validation**.
 *
 * @example
 *
 * await songCreateYoutube(YoutubeImportData)
 */
async function songCreateYoutube(data: YoutubeImportData) {
  const ytid = data.url.match(/([a-z0-9_-]{11})/gim)?.[0] as string // user data has already been validated

  let songId = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select song_id
        from Songs
        where source = 'youtube'
          and youtube_id = ?;
      `,
      [ytid]
    )
    .then(db_col<number>('song_id'))
    .catch(() => -1)

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

  let name = data.name

  if (songId === -1) {
    const filepath: string = uuidv4()
    const ready = Buffer.alloc(1, 0)

    await globalThis.db.query(
      /*sql*/ `
      insert into Songs (filepath, source, youtube_id, ready)
        values (?, 'youtube', ?, ?);
      `,
      [filepath, ytid, ready]
    )

    songId = await globalThis.db
      .query<RowDataPacket[]>(
        /*sql*/ `
        select song_id
          from Songs
          where filepath = ?;
        `,
        [filepath]
      )
      .then(db_col<number>('song_id'))

    songDownloadYoutube(data.url, filepath)
  } else if (name === '' || name === undefined) {
    const fpath = await globalThis.db
      .query<RowDataPacket[]>(
        /*sql*/ `
        select filepath
          from Songs
          where song_id = ?;
        `,
        [songId]
      )
      .then(db_col<number>('filepath'))

    const data = JSON.parse(
      (
        await fs.readFile(`${process.env.SONG_STORE}${fpath}.info.json`)
      ).toString()
    ) as { title: string }

    name = data.title
    name = name.replaceAll(/[^ -~]/g, '') // remove any non-ascii characters
    name = name.substring(0, Math.min(64, name.length))
  }

  await globalThis.db.query(
    /*sql*/ `
    insert into SongEntries (playlist_id, song_id, ordering, song_name)
      values (?, ?, ?, ?);
    `,
    [data.playlistid, songId, count, name]
  )
}

export default songCreateYoutube
