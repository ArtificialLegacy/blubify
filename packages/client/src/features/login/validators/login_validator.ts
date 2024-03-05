import * as yup from 'yup'

/**
 * Validation schema for the login form
 */
const loginValidationSchema = yup.object({
  username: yup.string().required('Username is required'),

  password: yup.string().required('Password is required'),
})

export default loginValidationSchema
