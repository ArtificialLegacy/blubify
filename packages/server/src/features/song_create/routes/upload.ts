import { Request, Response } from 'express'

import validateUploadImport from '../validators/validate_upload_import'
import songCreateUpload from '../services/song_create_upload'
import { APIStatus } from 'types'

function upload(
  deps = {
    songCreateUpload,
  }
) {
  return async (_req: Request, _res: Response) => {
    if (!(await validateUploadImport(_req.fields, _req.files))) {
      _res.status(400)
      _res.send({ status: 'invalid_request' } as APIStatus)
      return
    }

    deps.songCreateUpload(_req.fields, _req.files)

    _res.send({ status: 'success' } as APIStatus)
  }
}

export default upload
