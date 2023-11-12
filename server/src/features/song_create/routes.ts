import { Router } from 'express'

import { authUserCheck } from 'features/authentication'
import songCreateYoutube from './services/song_create_youtube'
import songCreateShare from './services/song_create_share'
import GenericResult from 'types/generic_result'
import validateYoutubeImport from './validators/validate_youtube_import'
import validateShareImport from './validators/validate_share_import'
import { userOwnsPlaylist } from 'features/playlist'
import validateUploadImport from './validators/validate_upload_import'
import songCreateUpload from './services/song_create_upload'
import formidableParse from 'middleware/formidable_parse'

/**
 * @middleware authUserCheck
 * @middlewware userOwnsPlaylist
 *
 * @endpoint '/youtube' - Used to submit a youtube song import.
 * @endpoint '/upload' - Used to submit an audio file.
 * @endpoint '/shared' - Used to add an already existing song from a different playlist to another playlist.
 *
 * @packageDocumentation
 */
const router = Router()
router.use(authUserCheck)
router.use(userOwnsPlaylist)

router.post('/youtube', async (_req, _res) => {
  if (!(await validateYoutubeImport(_req.body))) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  songCreateYoutube(_req.body)

  _res.send({ status: GenericResult.Success })
})

router.post('/upload', formidableParse, async (_req, _res) => {
  if (!(await validateUploadImport(_req.fields, _req.files))) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  songCreateUpload(_req.fields, _req.files)

  _res.send({ status: GenericResult.Success })
})

router.post('/shared', async (_req, _res) => {
  if (!(await validateShareImport(_req.body))) {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
    return
  }

  const success = await songCreateShare(_req.body)

  if (success) {
    _res.status(200)
    _res.send({ status: GenericResult.Success })
  } else {
    _res.status(400)
    _res.send({ status: GenericResult.InvalidRequest })
  }
})

export default router
