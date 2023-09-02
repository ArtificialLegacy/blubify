import youtubedl from 'youtube-dl-exec'

/**
 * Downloads an audio file of a youtube video, and saves it as a .m4a file. Also saves a json file of video data.
 * This function is async but should not be awaited
 * @param _url URL to youtube video to download, submitted from client.
 * @param _filepath Filepath to save audio file with. Should use uuid.
 *
 * @example
 *
 * songDownYoutube('https://youtu.be/sDf7sA78jxW', '4552d4f2-d243-4b87-944c-2c3ecbfdb63c')
 */
async function songDownloadYoutube(_url: string, _filepath: string) {
  await youtubedl(_url, {
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    extractAudio: true,
    audioQuality: 0,
    output: `public/songs/${_filepath}.m4a`,
    ffmpegLocation: process.env.FFMPEG_LOCATION,
    format: 'm4a',
    writeInfoJson: true,
    printJson: true,
  })
    .then(async (_data) => {
      await globalThis.db
        .updateTable('songs')
        .set({
          ready: Buffer.alloc(1, 1),
        })
        .where('filepath', '=', _filepath)
        .execute()

      let name = _data.title
      if (name !== undefined) {
        name = name.replaceAll(/[^ -~]/g, '') // remove any non-ascii characters
        name = name.substring(0, Math.min(64, name.length))
      }

      await globalThis.db
        .updateTable('songentries')
        .set({
          song_name: _data.title === undefined ? 'unnamed' : name,
        })
        .where(
          'song_id',
          '=',
          (
            await globalThis.db
              .selectFrom('songs')
              .select('song_id')
              .where('filepath', '=', _filepath)
              .executeTakeFirst()
          )?.song_id
        )
        .where('song_name', '=', '')
        .execute()
    })
    .catch(async () => {
      await globalThis.db
        .updateTable('songs')
        .set({
          failed: Buffer.alloc(1, 1),
        })
        .where('filepath', '=', _filepath)
        .execute()
    })
}

export default songDownloadYoutube
