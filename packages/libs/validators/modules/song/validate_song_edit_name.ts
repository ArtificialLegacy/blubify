import * as yup from 'yup'

import type { EditSongData } from 'types'

const songEditValidationSchema = yup.object({
    name: yup
        .string()
        .required('Song name is required.')
        .max(64, 'Song name must be 64 characters or less.')
        .matches(/[ -~]/g, 'Song name can only contain ascii characters.'),
})

/**
 * Validates the song name edit form.
 * @param _data - The song name edit form data.
 * @returns If the song name edit form data is valid.
 */
async function validateSongNameEdit(_data: EditSongData) {
    return await songEditValidationSchema
        .isValid(_data)
        .then((_value) => _value)
        .catch(() => false)
}

export { songEditValidationSchema, validateSongNameEdit }
