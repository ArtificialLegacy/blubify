import ffmpeg from 'fluent-ffmpeg'

/**
 * Process the uploaded song file to normalize for storage.
 * @param tempFilepath - The temporary filepath of the uploaded file.
 * @param filepath - The filepath to store the song at.
 */
async function songProcessUpload(tempFilepath: string, filepath: string) {
  const trueBit = Buffer.alloc(1, 1)

  ffmpeg()
    .input(tempFilepath)
    .on('end', async () => {
      await globalThis.db.query(
        /*sql*/ `
        update Songs
          set ready = ?
          where filepath = ?;
          `,
        [trueBit, filepath]
      )
    })
    .on('error', async (err) => {
      console.log(err)
      await globalThis.db.query(
        /*sql*/ `
        update Songs
          set failed = ?
          where filepath = ?;
        `,
        [trueBit, filepath]
      )
    })
    .save(`${process.env.SONG_STORE}${filepath}.webm`)
}

export default songProcessUpload
