import * as yup from 'yup'

const songEditValidationSchema = yup.object({
  name: yup
    .string()
    .required('Song name is required.')
    .max(64, 'Song name must be 64 characters or less.')
    .matches(/[ -~]/g, 'Song name can only contain ascii characters.'),
})

export default songEditValidationSchema
