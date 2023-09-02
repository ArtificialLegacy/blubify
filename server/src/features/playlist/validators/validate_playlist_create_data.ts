import * as yup from 'yup'
import PlaylistCreateData from '../types/playlist_create_data'

/**
 * Validation schema for the playlist creation endpoint.
 */
const playlistCreateDataValidationSchema = yup.object({
  name: yup.string().max(32).required(),
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
    .then(() => true)
    .catch(() => false)
}

export default validatePlaylistCreateData
