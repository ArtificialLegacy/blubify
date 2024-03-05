import * as yup from 'yup'

/**
 * Validation scheme for playlist edit user data.
 */
const playlistEditValidationSchema = yup.object({
  name: yup
    .string()
    .max(32, 'Playlist name must be 32 characters or less.')
    .required('Playlist name must be a string.'),
})

export default playlistEditValidationSchema
