import type { Request, Response, NextFunction } from 'express'
import formidable from 'formidable'

/**
 * Parses the request body and files using formidable.
 * @param _req
 * @param _res
 * @param _next
 */
function formidableParse(_req: Request, _res: Response, _next: NextFunction) {
  const form = formidable({})

  form.parse(_req, (_err, _fields, _files) => {
    if (_err) {
      return _next(_err)
    }

    _req.fields = _fields
    _req.files = _files

    _next()
  })
}

export default formidableParse
