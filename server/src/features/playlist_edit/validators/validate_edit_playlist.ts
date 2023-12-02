import * as yup from 'yup'

import type { PlaylistEditData } from '../types/playlist_edit_data'

/**
 * Validation scheme for playlist creation user data.
 */
const playlistEditValidationSchema = yup.object({
  name: yup.string().max(32).required(),
})

async function validatePlaylistEdit(_data: PlaylistEditData): Promise<boolean> {
  return await playlistEditValidationSchema
    .isValid(_data)
    .then((_value) => _value)
    .catch(() => false)
}

export default validatePlaylistEdit
