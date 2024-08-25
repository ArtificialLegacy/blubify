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
async function songDownloadYoutube(url: string, filepath: string) {
  await youtubedl(url, {
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    extractAudio: true,
    audioQuality: 0,
    output: `/usr/songs/${filepath}.mp3`,
    audioFormat: 'mp3',
    writeInfoJson: true,
    printJson: true,
  })
    .then(async (data) => {
      const ready = Buffer.alloc(1, 1)

      await globalThis.db.query(
        /*sql*/ `
        update Songs
          set ready = ?
          where filepath = ?;
        `,
        [ready, filepath]
      )

      let name = data.title
      if (name !== undefined) {
        name = name.replaceAll(/[^ -~]/g, '') // remove any non-ascii characters
        name = name.substring(0, Math.min(64, name.length))
      } else {
        name = 'unnamed'
      }

      await globalThis.db.query(
        /*sql*/ `
        update SongEntries
          set song_name = ?
          where song_id = (
            select song_id
              from Songs
              where filepath = ?
          )
            and song_name = "";
      `,
        [name, filepath]
      )
    })
    .catch(async () => {
      const failed = Buffer.alloc(1, 1)

      await globalThis.db.query(
        /*sql*/ `
        update Songs
          set failed = ?
          where filepath = ?;
        `,
        [failed, filepath]
      )
    })
}

export default songDownloadYoutube
