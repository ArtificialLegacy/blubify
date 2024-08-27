import { v4 as uuidv4 } from 'uuid'
import type formidable from 'formidable'
import songProcessUpload from './song_process_upload'
import { RowDataPacket } from 'mysql2'
import { db_col } from 'utility/db_unwrap'

/**
 * Create a song entry from an uploaded file.
 * @param fields - The html form fields.
 * @param files - The html form files.
 */
async function songCreateUpload(
  fields: formidable.Fields<string>,
  files: formidable.Files<string>
) {
  const count = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select count(entry_id) as count
        from SongEntries
        where playlist_id = ?
        group by playlist_id;
      `,
      [fields.playlistid]
    )
    .then(db_col<number>('count'))
    .catch(() => 0)

  const filepath: string = uuidv4()
  const ready = Buffer.alloc(1, 0) // in order to store only a single bit.

  await globalThis.db.query(
    /*sql*/ `
    insert into Songs (filepath, source, ready)
      values (?, 'upload', ?);
    `,
    [filepath, ready]
  )

  const songId = await globalThis.db
    .query<RowDataPacket[]>(
      /*sql*/ `
      select song_id
        from Songs
        where filepath = ?;
      `,
      [filepath]
    )
    .then(db_col<number>('song_id'))

  // formiddle values are ignored as they are missing proper typings
  // @ts-ignore
  songProcessUpload(files.file[0].filepath, filepath)

  await globalThis.db.query(
    /*sql*/ `
    insert into SongEntries (playlist_id, song_id, ordering, song_name)
      values (?, ?, ?, ?);
    `,
    // @ts-ignore
    [fields.playlist[0], songId, count, fields.name[0]]
  )
}

export default songCreateUpload
