import * as yup from 'yup'

import type { PlaylistCreateData } from 'types'

/**
 * Validation scheme for playlist creation user data.
 */
const playlistCreateDataValidationSchema = yup.object({
    name: yup
        .string()
        .max(32, 'Playlist name must be 32 characters or less.')
        .required('Playlist name must be a string.'),
})

/**
 * Validates user data submitted as playlist creation data.
 * @param _data The playlist creation data to validate.
 * @returns Promise with a result boolean, true if valid, else false
 *
 * @example
 *
 * const valid: boolean = validatePlaylistCreateData(PlaylistCreateData)
 */
async function validatePlaylistCreateData(_data: PlaylistCreateData) {
    return await playlistCreateDataValidationSchema
        .isValid(_data)
        .then((_value) => _value)
        .catch(() => false)
}

export { playlistCreateDataValidationSchema, validatePlaylistCreateData }
