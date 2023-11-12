import { v4 as uuidv4 } from 'uuid'
import type formidable from 'formidable'
import songProcessUpload from './song_process_upload'

/**
 * Create a song entry from an uploaded file.
 * @param _fields - The html form fields.
 * @param _files - The html form files.
 */
async function songCreateUpload(
  _fields: formidable.Fields<string>,
  _files: formidable.Files<string>
) {
  const countR = await globalThis.db
    .selectFrom('songentries')
    .select(({ fn }) => [fn.count<number>('song_id').as('count')])
    .groupBy('playlist_id')
    .where('playlist_id', '=', _fields.playlistid)
    .execute()

  const count = countR.length === 0 ? 0 : countR[0].count
  const filepath: string = uuidv4()

  await globalThis.db
    .insertInto('songs')
    .values({
      filepath,
      source: 'upload',
      ready: Buffer.alloc(1, 0),
    })
    .execute()

  const song = await globalThis.db
    .selectFrom('songs')
    .select('song_id')
    .where('filepath', '=', filepath)
    .executeTakeFirst()

  songProcessUpload(_files.file[0].filepath, filepath)

  await globalThis.db
    .insertInto('songentries')
    .values({
      playlist_id: _fields.playlist[0],
      song_id: song.song_id,
      ordering: count,
      song_name: _fields.name[0],
    })
    .execute()
}

export default songCreateUpload
