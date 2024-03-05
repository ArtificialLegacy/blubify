import * as yup from 'yup'
import type { EditSongData } from 'types'

/**
 * validation schema for the song name edit form.
 */
const songEditValidationSchema = yup.object({
  name: yup.string().required().max(64).matches(/[ -~]/g),
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

export default validateSongNameEdit
