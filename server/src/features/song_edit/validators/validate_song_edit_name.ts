import * as yup from 'yup'
import { EditSongNameData } from '../types/edit_song_name_data'

const songEditValidationSchema = yup.object({
  name: yup.string().required().max(64).matches(/[ -~]/g),
})

async function validateSongNameEdit(_data: EditSongNameData) {
  return await songEditValidationSchema
    .isValid(_data)
    .then(() => true)
    .catch(() => false)
}

export default validateSongNameEdit
