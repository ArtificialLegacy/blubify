import * as yup from 'yup'

import type { YoutubeImportData } from '../types/youtube_import_data'

/**
 * validation schema for the youtube import form.
 */
const youtubeImportValidationSchema = yup.object({
  url: yup.string().required().url(),

  name: yup.string().max(64),
})

async function validateYoutubeImport(
  _data: YoutubeImportData
): Promise<boolean> {
  return await youtubeImportValidationSchema
    .isValid(_data)
    .then((_value) => _value)
    .catch(() => false)
}

export default validateYoutubeImport
