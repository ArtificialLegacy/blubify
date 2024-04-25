import * as yup from 'yup'

import type { PlaylistEditData } from 'types'

/**
 * Validation scheme for playlist edit user data.
 */
const playlistEditValidationSchema = yup.object({
    name: yup
        .string()
        .max(32, 'Playlist name must be 32 characters or less.')
        .required('Playlist name must be a string.'),
})

async function validatePlaylistEdit(_data: PlaylistEditData): Promise<boolean> {
    return await playlistEditValidationSchema
        .isValid(_data)
        .then((_value) => _value)
        .catch(() => false)
}

export { playlistEditValidationSchema, validatePlaylistEdit }
