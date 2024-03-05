import ffmpeg from 'fluent-ffmpeg'

/**
 * Process the uploaded song file to normalize for storage.
 * @param _tempFilepath - The temporary filepath of the uploaded file.
 * @param _filepath - The filepath to store the song at.
 */
async function songProcessUpload(_tempFilepath: string, _filepath: string) {
  ffmpeg()
    .input(_tempFilepath)
    .on('end', async () => {
      await globalThis.db
        .updateTable('songs')
        .set({ ready: Buffer.alloc(1, 1) })
        .where('filepath', '=', _filepath)
        .execute()
    })
    .on('error', async () => {
      await globalThis.db
        .updateTable('songs')
        .set({
          failed: Buffer.alloc(1, 1),
        })
        .where('filepath', '=', _filepath)
        .execute()
    })
    .save(`public/songs/${_filepath}.m4a`)
}

export default songProcessUpload
