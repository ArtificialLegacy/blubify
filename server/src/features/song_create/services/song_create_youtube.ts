import { v4 as uuidv4 } from 'uuid'
import { promises as fs } from 'fs'

import type { YoutubeImportData } from '../types/youtube_import_data'
import songDownloadYoutube from './song_download_youtube'

/**
 * Creates a new song entry, and if needed, creates a new song and downloads it from youtube.
 * @param _data The youtube import data submitted by the user **after validation**.
 *
 * @example
 *
 * await songCreateYoutube(YoutubeImportData)
 */
async function songCreateYoutube(_data: YoutubeImportData) {
  const ytid = _data.url.match(/([a-z0-9_-]{11})/gim)[0]

  const exists: { song_id: number } | null = await globalThis.db
    .selectFrom('songs')
    .select('song_id')
    .where('source', '=', 'youtube')
    .where('youtube_id', '=', ytid)
    .executeTakeFirst()
    .catch(() => null)

  const countR = await globalThis.db
    .selectFrom('songentries')
    .select(({ fn }) => [fn.count<number>('song_id').as('count')])
    .groupBy('playlist_id')
    .where('playlist_id', '=', _data.playlistid)
    .execute()

  const count = countR.length === 0 ? 0 : countR[0].count
  let songId = exists?.song_id ?? -1
  const filepath: string = uuidv4()

  if (exists == null) {
    await globalThis.db
      .insertInto('songs')
      .values({
        filepath,
        source: 'youtube',
        youtube_id: ytid,
        ready: Buffer.alloc(1, 0),
      })
      .execute()

    const song = await globalThis.db
      .selectFrom('songs')
      .select('song_id')
      .where('filepath', '=', filepath)
      .executeTakeFirst()

    songDownloadYoutube(_data.url, filepath)

    songId = song.song_id
  }

  let name = _data.name

  if (name === '' && exists) {
    const { filepath: fpath } = await globalThis.db
      .selectFrom('songs')
      .select('filepath')
      .where('song_id', '=', songId)
      .executeTakeFirst()

    const data = JSON.parse(
      (await fs.readFile(`public/songs/${fpath}.info.json`)).toString()
    ) as { title: string }

    name = data.title
    name = name.replaceAll(/[^ -~]/g, '') // remove any non-ascii characters
    name = name.substring(0, Math.min(64, name.length))
  }

  await globalThis.db
    .insertInto('songentries')
    .values({
      playlist_id: _data.playlistid,
      song_id: songId,
      ordering: count,
      song_name: name,
    })
    .execute()
}

export default songCreateYoutube
