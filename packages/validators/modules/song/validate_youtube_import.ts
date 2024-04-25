import * as yup from 'yup'

import type { YoutubeImportData } from 'types'

/**
 * Validation schema for the youtube import form.
 */
const youtubeImportValidationSchema = yup.object({
    url: yup.string().required('Youtube URL is required.').url('Must be a valid url.'),

    name: yup.string().max(64, 'Song name can only be a maximum of 64 characters long.'),
})

async function validateYoutubeImport(_data: YoutubeImportData): Promise<boolean> {
    return await youtubeImportValidationSchema
        .isValid(_data)
        .then((_value) => _value)
        .catch(() => false)
}

export { youtubeImportValidationSchema, validateYoutubeImport }
