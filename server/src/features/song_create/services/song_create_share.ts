import type { ShareImportData } from '../types/share_import_data'

async function songCreateShare(_data: ShareImportData): Promise<boolean> {
  const songEntry = await globalThis.db
    .selectFrom('songentries')
    .select(['song_id', 'song_name'])
    .where('share_key', '=', _data.shareKey)
    .executeTakeFirst()

  if (songEntry === undefined) return false

  const countR = await globalThis.db
    .selectFrom('songentries')
    .select(({ fn }) => [fn.count<number>('song_id').as('count')])
    .groupBy('playlist_id')
    .where('playlist_id', '=', _data.playlistid)
    .execute()

  const count = countR.length === 0 ? 0 : countR[0].count

  await globalThis.db
    .insertInto('songentries')
    .values({ ...songEntry, playlist_id: _data.playlistid, ordering: count })
    .execute()

  return true
}

export default songCreateShare
