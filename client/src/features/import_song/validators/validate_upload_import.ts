import * as yup from 'yup'

/**
 * Validation schema for the upload import form.
 */
const uploadImportValidationSchema = yup.object({
  file: yup.mixed().required('File is required'),

  name: yup
    .string()
    .max(64, 'Song name can only be a maximum of 64 characters long.'),
})

export default uploadImportValidationSchema
